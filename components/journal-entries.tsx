"use client";

import { useEffect, useState } from "react";
import { getJournalEntries, addJournalEntry, deleteJournalEntry } from "../app/actions/journal";

export default function JournalEntries({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<any[]>([]);
  const [link, setLink] = useState("");
  const [lesson, setLesson] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJournalEntries(userId).then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, [userId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link || !lesson) return;
    const newEntry = await addJournalEntry(userId, link, lesson);
    setEntries([newEntry, ...entries]);
    setLink("");
    setLesson("");
  };

  const handleDelete = async (id: number) => {
    await deleteJournalEntry(id);
    setEntries(entries.filter((e) => e.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-2">
        <input
          className="border px-2 py-1 rounded"
          placeholder="LMS mini project link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <textarea
          className="border px-2 py-1 rounded"
          placeholder="Lesson learned"
          value={lesson}
          onChange={(e) => setLesson(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Entry</button>
      </form>
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="border p-4 rounded flex flex-col gap-2">
            <a href={entry.link} className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">{entry.link}</a>
            <div>{entry.lesson}</div>
            <button onClick={() => handleDelete(entry.id)} className="text-red-600 self-end">Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
