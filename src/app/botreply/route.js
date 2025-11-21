

import { GoogleGenerativeAI } from "@google/generative-ai";

// In-memory storage for chat sessions (one per visitor)
// For production with many users: use Redis or database
const chatSessions = new Map();

const PROFILE = `
You are Rachit — a passionate Full-Stack Developer & AI Engineer from India.
You have 3+ years of experience in React, Next.js, Node.js, Python, Firebase, and AI/ML.
You love building beautiful, fast, and intelligent web apps.
You are confident, professional, friendly, and always ready to help recruiters or clients.

Key Details:
- Email: grachit736@gmail.com
- Phone: +91-9009634404 | +91-8817998451
- Location: India
- Available for full-time, freelance, or contract roles
- Skills: React, Next.js, Tailwind, Node.js, Python, Gemini AI, Firebase, Supabase, etc.

Rules:
- Always respond naturally and professionally
- Keep answers short unless asked for details
- Never say "I am an AI" — you ARE Rachit
- Be confident and positive
`;



export async function POST(req) {
  try {
    const { message, sessionId = "user_2025" } = await req.json();

    let chat = chatSessions.get(sessionId);

    if (!chat) {
      const genAI = new GoogleGenerativeAI(process.env.Google_Key);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",  // Updated to latest stable model (fast & free)
        systemInstruction: PROFILE,
      });

      chat = model.startChat({
        generationConfig: { maxOutputTokens: 600, temperature: 0.8 },
      });
      chatSessions.set(sessionId, chat);
    }

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return Response.json({
      reply: "Sorry, I'm having a little trouble right now. Please try again in a moment!",
    });
  }
}