import { getSession } from '@/utils/sessionService';
import { Context, Next } from 'hono';

export async function authGuard(c: Context, next: Next) {
  const sessionId = c.req.header('X-Session-ID');

  if (!sessionId) {
    return c.json({ error: 'No session ID provided' }, 401);
  }

  const userId = await getSession(sessionId);

  if (!userId) {
    return c.json({ error: 'Invalid or expired session' }, 401);
  }

  c.set('userId', userId);
  await next();
}
