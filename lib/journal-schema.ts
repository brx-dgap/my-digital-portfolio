import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  link: text("link").notNull(),
  lesson: text("lesson").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
