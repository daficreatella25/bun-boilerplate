export const authSwagger = {
  'v1/auth/register': {
    post: {
      summary: 'Register a new user',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterDto',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse',
              },
            },
          },
        },
        '400': {
          description: 'Bad request',
        },
      },
    },
  },
  'v1/auth/login': {
    post: {
      summary: 'Login user',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse',
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
  'v1/auth/logout': {
    post: {
      summary: 'Logout user',
      tags: ['Authentication'],
      security: [{ BearerAuth: [] }],
      responses: {
        '200': {
          description: 'Logout successful',
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
  'v1/auth/refresh': {
    post: {
      summary: 'Refresh access token',
      tags: ['Authentication'],
      security: [{ BearerAuth: [] }],
      responses: {
        '200': {
          description: 'Token refreshed successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse',
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
};

export const authSchemas = {
  RegisterDto: {
    type: 'object',
    required: ['email', 'password', 'fullName'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', format: 'password' },
      fullName: { type: 'string' },
    },
  },
  LoginDto: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', format: 'password' },
    },
  },
  AuthResponse: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          email: { type: 'string' },
          fullName: { type: 'string' },
        },
      },
      sessionId: { type: 'string' },
    },
  },
};
