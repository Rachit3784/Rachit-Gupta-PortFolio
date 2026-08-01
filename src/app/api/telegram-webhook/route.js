// src/app/api/telegram-webhook/route.js
// Receives incoming Telegram webhook events.
// Dual-lookup strategy for matching Telegram replies to users:
// 1. Primary: Match telegramMessageId === reply_to_message.message_id
// 2. Fallback: Extract MongoDB ObjectId from reply_to_message (text or caption) via 🆔 regex
import { NextResponse } from 'next/server';
import { connectDB }   from '@/lib/mongodb';
import { ChatMessage } from '@/lib/models/ChatMessage';

export async function POST(req) {
  try {
    const body   = await req.json();
    const update = body;

    // Only handle message updates
    const message = update.message || update.edited_message;
    if (!message) return NextResponse.json({ ok: true });

    // We only care about replies (admin replying to a user's forwarded message)
    const replyTo = message.reply_to_message;
    if (!replyTo) return NextResponse.json({ ok: true });

    const replyToMessageId = replyTo.message_id;
    const adminText = message.text || message.caption || '';

    if (!adminText.trim()) return NextResponse.json({ ok: true });

    await connectDB();

    let userMessage = null;

    // Lookup 1: By stored telegramMessageId
    if (replyToMessageId) {
      userMessage = await ChatMessage.findOne({ telegramMessageId: replyToMessageId });
    }

    // Lookup 2 Fallback: Extract DB ObjectId from original forwarded message header (text or caption)
    if (!userMessage) {
      const originalContent = (replyTo.caption || replyTo.text || '');
      const match = originalContent.match(/🆔\s*`?([0-9a-fA-F]{24})`?/);
      if (match && match[1]) {
        userMessage = await ChatMessage.findById(match[1]);
      }
    }

    if (!userMessage) {
      console.log(`[webhook] Could not resolve user for reply to message_id=${replyToMessageId}`);
      return NextResponse.json({ ok: true });
    }

    // Create admin reply for this specific user
    const adminMsg = await ChatMessage.create({
      userId:  userMessage.userId,
      role:    'admin',
      type:    'text',
      content: adminText.trim(),
    });

    console.log(`[webhook] Saved admin reply (ID: ${adminMsg._id}) for userId=${userMessage.userId}`);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('[telegram-webhook error]', err);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}

// Support GET for endpoint verification
export async function GET() {
  return NextResponse.json({ status: 'Telegram webhook endpoint active' });
}
