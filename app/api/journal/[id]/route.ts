import { NextResponse } from 'next/server';
import { deleteJournalEntry } from '@/app/actions/journal';
import { ajStrict } from '@/lib/arcjet-config';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // Arcjet strict protection for API routes
  const decision = await ajStrict.protect(req);
  
  // Handle errors - fail open (allow request through but log error)
  for (const result of decision.results) {
    if (result.reason.isError()) {
      console.warn('Arcjet error:', result.reason.message);
      // Continue processing - fail open
    }
  }
  
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
