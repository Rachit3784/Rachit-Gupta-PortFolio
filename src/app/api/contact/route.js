// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in environment variables.');
      return NextResponse.json(
        { error: 'Telegram bot settings are not configured in environment variables.' },
        { status: 500 }
      );
    }

    // Format message for Telegram
    const telegramText = `📩 <b>New Portfolio Contact Submission</b>\n\n<b>👤 Name:</b> ${escapeHtml(name)}\n<b>✉️ Email:</b> ${escapeHtml(email)}\n\n<b>💬 Message:</b>\n${escapeHtml(message)}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'HTML',
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      console.error('Telegram API Error:', telegramData);
      return NextResponse.json(
        { error: 'Failed to send message via Telegram Bot.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}