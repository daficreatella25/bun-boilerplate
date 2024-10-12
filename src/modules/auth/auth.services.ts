import { hash, compare } from '@node-rs/bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.services';
import { refreshSession, removeSession } from '@/utils/sessionService';
import { generateToken } from '@/utils/jwtServices';
import { LoginDto } from './dto/login.dto';

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
    const token = generateToken(user.id);
    return { user: userWithoutPassword, token };
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.usersService.findByEmail(email);
    if (!user || !(await compare(password, user.passwordHash))) {
      return null;
    }

    const token = generateToken(user.id);
    return { user, token };
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
