import { Hono } from 'hono';
import { UsersController } from './users.controller';
import { authGuard } from '@/common/middlewares/auth.guard';
import { UsersService } from './users.services';

export class UsersModule {
  private usersController: UsersController;

  constructor(app: Hono) {
    const usersService = new UsersService();
    this.usersController = new UsersController(usersService);
    this.setupRoutes(app);
  }

  private setupRoutes(app: Hono) {
    const users = new Hono();

    users.use('*', authGuard);

    users.get('/', (c) => this.usersController.getUsers(c));
    users.get('/:id', (c) => this.usersController.getUser(c));
    users.post('/', (c) => this.usersController.createUser(c));
    users.put('/:id', (c) => this.usersController.updateUser(c));
    users.delete('/:id', (c) => this.usersController.deleteUser(c));

    app.route('/users', users);
  }
}
