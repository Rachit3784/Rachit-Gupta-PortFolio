// src/app/api/auth/check-user/route.js
// POST { email }                   → checks DB. Returns { exists, user? }
// POST { email, name, create:true} → creates new user, sets JWT cookie
import { NextResponse } from 'next/server';
import { connectDB }    from '@/lib/mongodb';
import { ChatUser }     from '@/lib/models/ChatUser';
import { signToken, getCookieOptions, COOKIE_NAME } from '@/lib/jwt';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, name, create } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Prevent anyone from registering as Admin on recruiter side
    if (normalizedEmail === 'grachit736@gmail.com') {
      return NextResponse.json(
        { error: 'This email is reserved for Super Admin login. Please enter your own email.' },
        { status: 403 }
      );
    }

    /* ── Create new user ── */
    if (create) {
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
      }
      // Check again to prevent race condition
      const existing = await ChatUser.findOne({ email: normalizedEmail });
      if (existing) {
        return setAuthCookieAndReturn(existing);
      }
      const user = await ChatUser.create({ email: normalizedEmail, name: name.trim() });
      return setAuthCookieAndReturn(user);
    }

    /* ── Check existing user ── */
    const user = await ChatUser.findOne({ email: normalizedEmail });
    if (user) {
      // Update last active
      user.lastActive = new Date();
      await user.save();
      return setAuthCookieAndReturn(user);
    }

    // New user — client will ask for name
    return NextResponse.json({ exists: false });

  } catch (err) {
    console.error('[check-user]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function setAuthCookieAndReturn(user) {
  const token = signToken({ userId: user._id.toString(), email: user.email, name: user.name });
  const res   = NextResponse.json({
    exists: true,
    user: { id: user._id, name: user.name, email: user.email },
  });
  res.cookies.set(COOKIE_NAME, token, getCookieOptions());
  return res;
}
