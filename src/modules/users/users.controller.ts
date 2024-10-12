import { Context } from 'hono';
import { UsersService } from './users.services';
import { hash } from '@node-rs/bcrypt';

export class UsersController {
  constructor(private usersService: UsersService) {}

  async getUsers(c: Context) {
    const users = await this.usersService.findAll();
    return c.json(users);
  }

  async getUser(c: Context) {
    const id = c.req.param('id');
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json(user);
  }

  async createUser(c: Context) {
    const userData = await c.req.json();
    if (userData.password) {
      userData.passwordHash = await hash(userData.password, 10);
      delete userData.password;
    }
    const user = await this.usersService.create(userData);
    return c.json(user, 201);
  }

  async updateUser(c: Context) {
    const id = c.req.param('id');
    const userData = await c.req.json();
    const user = await this.usersService.update(parseInt(id), userData);
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json(user);
  }

  async deleteUser(c: Context) {
    const id = c.req.param('id');
    await this.usersService.delete(parseInt(id));
    return c.json({ message: 'User deleted' });
  }
}
