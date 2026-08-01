// src/app/api/chat/poll/route.js
// GET ?after=ISO_TIMESTAMP
// Returns new ADMIN messages for the authenticated user since `after`.
// Client polls this every 3 seconds to get real-time admin replies.
import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import { connectDB }    from '@/lib/mongodb';
import { ChatMessage }  from '@/lib/models/ChatMessage';
import { verifyToken, COOKIE_NAME } from '@/lib/jwt';

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const after = searchParams.get('after');

    await connectDB();

    const query = {
      userId: payload.userId,
      role:   'admin',
      ...(after ? { createdAt: { $gt: new Date(after) } } : {}),
    };

    const messages = await ChatMessage.find(query).sort({ createdAt: 1 }).lean();
    return NextResponse.json({ messages });

  } catch (err) {
    console.error('[chat/poll]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
