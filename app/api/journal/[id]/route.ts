import { NextResponse } from 'next/server';
import { deleteJournalEntry } from '@/app/actions/journal';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ error: 'invalid id' }, { status: 400 });
    await deleteJournalEntry(id);
    return NextResponse.json({ success: true }, { status: 204 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
