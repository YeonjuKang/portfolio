import { pgTable, serial, text, varchar, date, jsonb, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  company: varchar('company', { length: 256 }).notNull(),
  role: varchar('role', { length: 256 }).notNull(),
  startedAt: date('started_at').notNull(),
  endedAt: date('ended_at'), // NULLABLE
  description: jsonb('description').$type<string[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const educations = pgTable('educations', {
  id: serial('id').primaryKey(),
  institution: varchar('institution', { length: 256 }).notNull(),
  major: varchar('major', { length: 256 }).notNull(),
  startedAt: date('started_at').notNull(),
  endedAt: date('ended_at'), // NULLABLE
  description: text('description'), // NULLABLE
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
