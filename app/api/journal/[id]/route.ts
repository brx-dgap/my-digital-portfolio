import { NextResponse } from 'next/server';
import { deleteJournalEntry } from '@/app/actions/journal';
import { aj } from '@/lib/arcjet-config';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // Arcjet protection
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

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
