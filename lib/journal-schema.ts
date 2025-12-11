import { pgTable, serial, text, timestamp, json, boolean } from "drizzle-orm/pg-core";

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  link: text("link").notNull(),
  lesson: text("lesson").notNull(),
  submissionCategory: text("submission_category").default("mini-project"), // mini-project, assignment, research, challenge
  submissionDate: timestamp("submission_date").defaultNow().notNull(),
  requirementsMet: json("requirements_met").default([]), // Array of requirement IDs met
  notes: text("notes"), // Additional notes about submission
  status: text("status").default("submitted"), // submitted, reviewed, completed, pending
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
