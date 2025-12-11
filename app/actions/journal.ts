"use server";

import { db } from "@/lib/db";
import { journalEntries } from "@/lib/journal-schema";
import { eq } from "drizzle-orm";

/**
 * Get all journal entries for a user
 */
export async function getJournalEntries(userId: string) {
  try {
    return await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId))
      .orderBy(journalEntries.createdAt.desc());
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }
}

/**
 * Add a new journal entry with all metadata
 */
export async function addJournalEntry(
  userId: string,
  link: string,
  lesson: string,
  submissionCategory: string = "mini-project",
  notes: string = "",
  miniProject: string = ""
) {
  try {
    const [entry] = await db
      .insert(journalEntries)
      .values({
        userId,
        link,
        lesson,
        submissionCategory,
        notes: notes || null,
        status: "submitted",
        submissionDate: new Date(),
        requirementsMet: miniProject ? [miniProject] : [],
      })
      .returning();
    return entry;
  } catch (error) {
    console.error("Error adding journal entry:", error);
    return null;
  }
}

/**
 * Update an existing journal entry
 */
export async function updateJournalEntry(
  id: number,
  updates: {
    lesson?: string;
    notes?: string;
    status?: string;
    requirementsMet?: string[];
  }
) {
  try {
    const [entry] = await db
      .update(journalEntries)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(journalEntries.id, id))
      .returning();
    return entry;
  } catch (error) {
    console.error("Error updating journal entry:", error);
    return null;
  }
}

/**
 * Delete a journal entry
 */
export async function deleteJournalEntry(id: number) {
  try {
    await db
      .delete(journalEntries)
      .where(eq(journalEntries.id, id));
    return true;
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    return false;
  }
}
