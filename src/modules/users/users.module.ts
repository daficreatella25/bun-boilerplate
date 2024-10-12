import { Hono } from 'hono';

import { UsersController } from './users.controller';
import { UsersService } from './users.services';

export class UsersModule {
  private usersController: UsersController;

  constructor(app: Hono) {
    const usersService = new UsersService();
    this.usersController = new UsersController(usersService);
    this.setupRoutes(app);
  }

  private setupRoutes(app: Hono) {
    app.get('/users', (c) => this.usersController.getUsers(c));
    app.get('/users/:id', (c) => this.usersController.getUser(c));
    app.post('/users', (c) => this.usersController.createUser(c));
    app.put('/users/:id', (c) => this.usersController.updateUser(c));
    app.delete('/users/:id', (c) => this.usersController.deleteUser(c));
  }
}
