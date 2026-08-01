// src/app/api/chat/send/route.js
// POST multipart/form-data or JSON: { message?, file? }
// Saves message directly to MongoDB (portfoliodb) and returns it. Zero Telegram code!
import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import { connectDB }    from '@/lib/mongodb';
import { ChatUser }     from '@/lib/models/ChatUser';
import { ChatMessage }  from '@/lib/models/ChatMessage';
import { verifyToken, COOKIE_NAME } from '@/lib/jwt';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    await connectDB();
    const user = await ChatUser.findById(payload.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const formData  = await req.formData();
    const text      = formData.get('message') || '';
    const file      = formData.get('file');

    let type     = 'text';
    let content  = text.trim();
    let fileName = null;
    let fileSize = null;

    if (file && file.size > 0) {
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: 'File exceeds 10MB limit' }, { status: 413 });
      }
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Only images and PDFs are allowed' }, { status: 415 });
      }
      type     = file.type.startsWith('image/') ? 'image' : 'pdf';
      fileName = file.name;
      fileSize = file.size;
      content  = text.trim();
    }

    if (!content && !file) {
      return NextResponse.json({ error: 'Message or file is required' }, { status: 400 });
    }

    /* ── Save to MongoDB Atlas (portfoliodb) ── */
    const msgDoc = await ChatMessage.create({
      userId:  user._id,
      role:    'user',
      type,
      content,
      fileName,
      fileSize,
    });

    // Also notify common server on port 5000 via HTTP if running
    try {
      await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:   user._id.toString(),
          type,
          content,
          fileName,
          fileSize,
        }),
      });
    } catch {
      // Server notification optional if local fallback
    }

    return NextResponse.json({
      message: {
        _id:       msgDoc._id,
        role:      'user',
        type,
        content,
        fileName,
        fileSize,
        createdAt: msgDoc.createdAt,
      },
    });

  } catch (err) {
    console.error('[chat/send error]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
