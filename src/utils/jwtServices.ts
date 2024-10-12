import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): JwtPayload {
  const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (!payload || typeof payload === 'string') {
    throw new Error('Invalid token');
  }
  return payload;
}
