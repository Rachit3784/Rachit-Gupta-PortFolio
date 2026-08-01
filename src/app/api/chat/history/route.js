// src/app/api/chat/history/route.js
// GET → returns all messages for the authenticated user (read from JWT cookie)
import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import { connectDB }    from '@/lib/mongodb';
import { ChatMessage }  from '@/lib/models/ChatMessage';
import { verifyToken, COOKIE_NAME } from '@/lib/jwt';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    await connectDB();

    const messages = await ChatMessage.find({ userId: payload.userId })
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      user: {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
      },
      messages,
    });
  } catch (err) {
    console.error('[chat/history]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
