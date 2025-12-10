import { db } from "@/lib/db";
import { journalEntries } from "@/lib/journal-schema";
import { eq } from "drizzle-orm";

export async function getJournalEntries(userId: string) {
  return db.select().from(journalEntries).where(eq(journalEntries.userId, userId)).orderBy(journalEntries.createdAt.desc());
}

export async function addJournalEntry(userId: string, link: string, lesson: string) {
  const [entry] = await db.insert(journalEntries).values({ userId, link, lesson }).returning();
  return entry;
}

export async function deleteJournalEntry(id: number) {
  await db.delete(journalEntries).where(eq(journalEntries.id, id));
}
