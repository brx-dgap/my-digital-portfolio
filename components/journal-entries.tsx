"use client";

import React, { useCallback, useEffect, useState } from "react";

type JournalEntry = {
  id: number;
  user_id?: string | null;
  userId?: string; // some DB drivers return camelCase
  link: string;
  lesson: string;
  created_at?: string;
  createdAt?: string;
};

export default function JournalEntries({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [link, setLink] = useState("");
  const [lesson, setLesson] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/journal?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEntries(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchEntries();
  }, [userId, fetchEntries]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link.trim() || !lesson.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, link: link.trim(), lesson: lesson.trim() }),
      });
      if (!res.ok) throw new Error('Failed to save');
      const newEntry: JournalEntry = await res.json();
      setEntries(prev => [newEntry, ...prev]);
      setLink('');
      setLesson('');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/journal/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete');
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
    }
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={saving}>{saving ? 'Saving...' : 'Add Entry'}</button>
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
