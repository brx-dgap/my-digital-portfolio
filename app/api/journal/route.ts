import { NextResponse } from 'next/server';
import { getJournalEntries, addJournalEntry } from '@/app/actions/journal';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    const entries = await getJournalEntries(userId);
    return NextResponse.json(entries);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, link, lesson } = body || {};
    if (!userId || !link || !lesson) return NextResponse.json({ error: 'missing fields' }, { status: 400 });
    const entry = await addJournalEntry(userId, link, lesson);
    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
