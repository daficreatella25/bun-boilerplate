import { verifyToken } from '@/utils/jwtServices';
import { Context, Next } from 'hono';

export async function authGuard(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No token provided' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifyToken(token);
    c.set('userId', payload.userId);
    await next();
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}
