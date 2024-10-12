import { db } from '@config/db';
import { appUsers } from '@schema/users';
import { eq } from 'drizzle-orm/expressions';
import { MySqlInsertValue } from 'drizzle-orm/mysql-core';

type NewUser = Omit<typeof appUsers.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>;

export class UsersService {
  async findAll() {
    return db.select().from(appUsers);
  }

  async findOne(id: number) {
    const users = await db.select().from(appUsers).where(eq(appUsers.id, id)).limit(1);
    return users[0];
  }

  async create(userData: NewUser) {
    const insertData: MySqlInsertValue<typeof appUsers> = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.insert(appUsers).values(insertData);

    // Drizzle doesn't return the inserted ID directly, so we need to get it from the result
    const insertedId = Number(result[0].insertId);

    return this.findOne(insertedId);
  }

  async update(id: number, userData: Partial<NewUser>) {
    await db
      .update(appUsers)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(appUsers.id, id));
    return this.findOne(id);
  }

  async delete(id: number) {
    await db.delete(appUsers).where(eq(appUsers.id, id));
  }

  async findByEmail(email: string) {
    const users = await db.select().from(appUsers).where(eq(appUsers.email, email)).limit(1);
    return users[0];
  }
}
