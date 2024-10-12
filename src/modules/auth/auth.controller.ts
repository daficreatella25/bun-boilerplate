import { Context } from 'hono';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.services';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(c: Context) {
    const data = await c.req.json<RegisterDto>();
    const result = await this.authService.register(data);
    if ('error' in result) {
      return c.json(result, 400);
    }
    return c.json(result, 201);
  }

  async login(c: Context) {
    const data = await c.req.json<LoginDto>();
    const result = await this.authService.login(data);
    if (!result) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    return c.json(result);
  }

  async logout(c: Context) {
    const sessionId = c.req.header('X-Session-ID');
    if (!sessionId) {
      return c.json({ error: 'No session ID provided' }, 400);
    }
    await this.authService.logout(sessionId);
    return c.json({ message: 'Logged out successfully' });
  }

  async refreshToken(c: Context) {
    const sessionId = c.req.header('X-Session-ID');
    if (!sessionId) {
      return c.json({ error: 'No session ID provided' }, 400);
    }
    const result = await this.authService.refreshToken(sessionId);
    if (!result) {
      return c.json({ error: 'Invalid or expired session' }, 401);
    }
    return c.json(result);
  }
}
