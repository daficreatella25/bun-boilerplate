import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { UsersModule } from '@/modules/users/users.module';
import { usersSwagger, usersSchemas } from '@/modules/users/users.swagger';
import { AuthModule } from './modules/auth/auth.module';
import { authSchemas, authSwagger } from './modules/auth/auth.swagger';

export class AppModule {
  private app: Hono;
  private apiVersion = 'v1';

  constructor() {
    this.app = new Hono();
    this.setupSwagger();
    this.setupModules();
  }

  private setupModules() {
    const api = new Hono();

    new UsersModule(api);
    new AuthModule(api);

    this.app.route(`/api/${this.apiVersion}`, api);
  }

  private setupSwagger() {
    const swaggerConfig = {
      openapi: '3.0.0',
      info: {
        title: 'Mobile API',
        version: '1.0.0',
        description: 'API documentation for the Mobile API project',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
      paths: {
        ...usersSwagger,
        ...authSwagger,
      },
      components: {
        schemas: {
          ...usersSchemas,
          ...authSchemas,
        },
      },
    };

    // Serve Swagger JSON
    this.app.get('/swagger.json', (c) => c.json(swaggerConfig));

    // Serve Swagger UI
    this.app.use('/swagger', swaggerUI({ url: '/swagger.json' }));
  }

  getApp() {
    return this.app;
  }
}
