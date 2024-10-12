import { hash, compare } from '@node-rs/bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.services';
import { createSession, refreshSession, removeSession } from '@/utils/sessionService';

export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(data: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await hash(data.password, 10);
    const user = await this.usersService.create({
      email: data.email,
      passwordHash: hashedPassword,
      fullName: data.fullName,
    });

    const { ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) return null;

    const isPasswordValid = await compare(data.password, user.passwordHash);
    if (!isPasswordValid) return null;

    const sessionId = await createSession(user.id);
    await this.usersService.update(user.id, { lastLoginAt: new Date() });

    const { ...userWithoutPassword } = user;
    return { user: userWithoutPassword, sessionId };
  }

  async logout(sessionId: string) {
    await removeSession(sessionId);
  }

  async refreshToken(sessionId: string) {
    const userId = await refreshSession(sessionId);
    if (userId === null) return null;

    const user = await this.usersService.findOne(userId);
    if (!user) return null;

    const { ...userWithoutPassword } = user;
    return { user: userWithoutPassword, sessionId };
  }
}
