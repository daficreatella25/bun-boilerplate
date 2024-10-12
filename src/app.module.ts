import { Hono } from 'hono';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';

export class AppModule {
  private app: Hono;

  constructor() {
    this.app = new Hono();
    this.setupModules();
  }

  private setupModules() {
    new UsersModule(this.app);
    new AuthModule(this.app);
  }

  getApp() {
    return this.app;
  }
}
