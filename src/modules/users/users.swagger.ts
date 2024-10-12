export const usersSwagger = {
  'v1/users': {
    get: {
      summary: 'Get all users',
      tags: ['Users'],
      security: [{ SessionAuth: [] }],
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
    post: {
      summary: 'Create a new user',
      tags: ['Users'],
      security: [{ SessionAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NewUser',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
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
  'v1/users/{id}': {
    get: {
      summary: 'Get a user by ID',
      tags: ['Users'],
      security: [{ SessionAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        '404': {
          description: 'User not found',
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
    put: {
      summary: 'Update a user',
      tags: ['Users'],
      security: [{ SessionAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUser',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        '404': {
          description: 'User not found',
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
    delete: {
      summary: 'Delete a user',
      tags: ['Users'],
      security: [{ SessionAuth: [] }],

      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        '200': {
          description: 'User deleted successfully',
        },
        '404': {
          description: 'User not found',
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
};

export const usersSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      email: { type: 'string' },
      fullName: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
  NewUser: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      fullName: { type: 'string' },
    },
  },
  UpdateUser: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      fullName: { type: 'string' },
    },
  },
};
