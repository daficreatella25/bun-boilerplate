import crypto from 'crypto';

import redis from '@config/redis';

const SESSION_EXPIRY = 60 * 60 * 24 * 7; // 7 days in seconds

export async function createSession(userId: number): Promise<string> {
  const sessionId = crypto.randomBytes(32).toString('hex');
  await redis.set(`session:${sessionId}`, userId.toString(), 'EX', SESSION_EXPIRY);
  return sessionId;
}

export async function getSession(sessionId: string): Promise<number | null> {
  const userId = await redis.get(`session:${sessionId}`);
  return userId ? parseInt(userId, 10) : null;
}

export async function removeSession(sessionId: string): Promise<void> {
  await redis.del(`session:${sessionId}`);
}

export async function refreshSession(sessionId: string): Promise<number | null> {
  const userId = await redis.get(`session:${sessionId}`);
  if (userId) {
    await redis.expire(`session:${sessionId}`, SESSION_EXPIRY);
    return parseInt(userId, 10);
  }
  return null;
}
