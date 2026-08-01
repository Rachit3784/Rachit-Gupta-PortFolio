// src/app/api/contact/messages/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Messages are now sent directly to your Telegram group in real time.',
    contacts: [],
  });
}