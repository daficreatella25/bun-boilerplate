import { mysqlTable, varchar, int, timestamp, boolean } from 'drizzle-orm/mysql-core';

export const appUsers = mysqlTable('app_users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  fullName: varchar('full_name', { length: 255 }),
  profilePictureUrl: varchar('profile_picture_url', { length: 512 }),
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
