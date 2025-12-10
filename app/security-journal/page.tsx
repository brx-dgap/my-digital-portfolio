import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import JournalEntries from "@/components/journal-entries";

export default async function SecurityJournalPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Security Journal</h1>
      <JournalEntries userId={user.id} />
    </main>
  );
}
