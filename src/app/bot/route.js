import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Information is required' },
        { status: 400}
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `📝 <b>Portfolio Content Update:</b>\n\n${message}`,
          parse_mode: 'HTML',
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing bot route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}