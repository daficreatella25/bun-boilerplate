# Mobile API Project

This project is a mobile API built with Bun, Hono, and Drizzle ORM.

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- MySQL database
- Redis server

## Setup

1. Clone the repository:
   ```
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the necessary environment variables:
     ```
     DATABASE_HOST=localhost
     DATABASE_USER=your_username
     DATABASE_PASSWORD=your_password
     DATABASE_NAME=your_database
     DATABASE_PORT=3306
     REDIS_HOST=localhost
     REDIS_PORT=6379
     REDIS_PASSWORD=your_redis_password
     JWT_SECRET=your_jwt_secret
     JWT_REFRESH_SECRET=your_refresh_secret
     ```

4. Set up the database:
   - Create a MySQL database matching the name in your `.env` file
   - Run migrations:
     ```
     bun run db:generate
     bun run db:push
     ```

## Running the Project

- To start the development server:
  ```
  bun run dev
  ```

- To start the production server:
  ```
  bun run start
  ```

The server will start on `http://localhost:3000` by default.

## API Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and receive a session token
- `POST /auth/logout`: Logout and invalidate the session token
- `GET /users`: Get all users (protected route)
- `GET /users/:id`: Get a specific user (protected route)
- `PUT /users/:id`: Update a user (protected route)
- `DELETE /users/:id`: Delete a user (protected route)

## Testing

To run tests (if implemented):
```
bun test
```

## Linting and Formatting

- To run the linter:
  ```
  bun run lint
  ```

- To automatically fix linting issues:
  ```
  bun run lint:fix
  ```

- To format the code:
  ```
  bun run format
  ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.