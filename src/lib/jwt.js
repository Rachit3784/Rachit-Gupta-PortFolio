// src/lib/jwt.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define JWT_SECRET in .env');
}

const COOKIE_NAME = 'chat_token';
const EXPIRES_IN  = '7d';

/**
 * Sign a JWT payload and return the token string.
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

/**
 * Verify a JWT string. Returns decoded payload or null on failure.
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Cookie options for HTTP-Only, secure JWT cookie.
 */
export function getCookieOptions() {
  return {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 7, // 7 days in seconds
    path:     '/',
  };
}

export { COOKIE_NAME };
