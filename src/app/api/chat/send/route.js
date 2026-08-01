// src/app/api/chat/send/route.js
// POST multipart/form-data: { message?, file? }
// 1. Validates file < 10MB, type image/* or application/pdf
// 2. Saves message to MongoDB
// 3. Forwards to Telegram
// 4. Stores telegramMessageId back on the message document
import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import { connectDB }    from '@/lib/mongodb';
import { ChatUser }     from '@/lib/models/ChatUser';
import { ChatMessage }  from '@/lib/models/ChatMessage';
import { verifyToken, COOKIE_NAME } from '@/lib/jwt';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req) {
  try {
    /* ── Auth ── */
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    await connectDB();
    const user = await ChatUser.findById(payload.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    /* ── Parse FormData ── */
    const formData  = await req.formData();
    const text      = formData.get('message') || '';
    const file      = formData.get('file');   // File object or null

    let type    = 'text';
    let content = text.trim();
    let fileName   = null;
    let fileSize   = null;
    let fileBuffer = null;
    let fileMime   = null;

    if (file && file.size > 0) {
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: 'File exceeds 10MB limit' }, { status: 413 });
      }
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Only images and PDFs are allowed' }, { status: 415 });
      }
      type       = file.type.startsWith('image/') ? 'image' : 'pdf';
      fileName   = file.name;
      fileSize   = file.size;
      fileMime   = file.type;
      fileBuffer = Buffer.from(await file.arrayBuffer());
      content    = text.trim(); // optional caption
    }

    if (!content && !fileBuffer) {
      return NextResponse.json({ error: 'Message or file is required' }, { status: 400 });
    }

    /* ── Save to MongoDB ── */
    const msgDoc = await ChatMessage.create({
      userId:  user._id,
      role:    'user',
      type,
      content,
      fileName,
      fileSize,
    });

    /* ── Forward to Telegram ── */
    const telegramMessageId = await sendToTelegram({
      user,
      text:  content,
      type,
      fileBuffer,
      fileName,
      fileMime,
      dbMessageId: msgDoc._id.toString(),
    });

    /* ── Store Telegram message_id ── */
    if (telegramMessageId) {
      msgDoc.telegramMessageId = telegramMessageId;
      await msgDoc.save();
    }

    return NextResponse.json({
      message: {
        _id:               msgDoc._id,
        role:              'user',
        type,
        content,
        fileName,
        fileSize,
        telegramMessageId,
        createdAt:         msgDoc.createdAt,
      },
    });

  } catch (err) {
    console.error('[chat/send]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/* ── Telegram helper ── */
async function sendToTelegram({ user, text, type, fileBuffer, fileName, fileMime, dbMessageId }) {
  try {
    const header  = `💬 *Message from:*\n👤 ${user.name}\n📧 ${user.email}\n🆔 \`${dbMessageId}\`\n`;
    const caption = text ? `\n📝 ${text}` : '';

    let endpoint, body;

    if (fileBuffer) {
      const form    = new FormData();
      const blob    = new Blob([fileBuffer], { type: fileMime });

      if (type === 'image') {
        endpoint = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
        form.append('chat_id', CHAT_ID);
        form.append('photo',   blob, fileName);
        form.append('caption', header + caption);
        form.append('parse_mode', 'Markdown');
      } else {
        endpoint = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
        form.append('chat_id',  CHAT_ID);
        form.append('document', blob, fileName);
        form.append('caption',  header + caption);
        form.append('parse_mode', 'Markdown');
      }

      const res  = await fetch(endpoint, { method: 'POST', body: form });
      const data = await res.json();
      return data.ok ? data.result.message_id : null;

    } else {
      // Text only
      endpoint = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      body = JSON.stringify({
        chat_id:    CHAT_ID,
        text:       header + caption,
        parse_mode: 'Markdown',
      });
      const res  = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      const data = await res.json();
      return data.ok ? data.result.message_id : null;
    }

  } catch (err) {
    console.error('[sendToTelegram]', err);
    return null;
  }
}
