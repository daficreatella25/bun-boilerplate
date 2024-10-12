import { Hono } from 'hono';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.services';
import { AuthService } from './auth.services';

export class AuthModule {
  private authController: AuthController;

  constructor(app: Hono) {
    const usersService = new UsersService();
    const authService = new AuthService(usersService);
    this.authController = new AuthController(authService);
    this.setupRoutes(app);
  }

  private setupRoutes(app: Hono) {
    app.post('/auth/register', (c) => this.authController.register(c));
    app.post('/auth/login', (c) => this.authController.login(c));
    app.post('/auth/logout', (c) => this.authController.logout(c));
    app.post('/auth/refresh', (c) => this.authController.refreshToken(c));
  }
}
