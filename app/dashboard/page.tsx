import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getNotesByUser } from "@/lib/notes";

export default async function DashboardPage() {
  const user = await getCurrentUser(await headers());

  if (!user) {
    redirect("/authenticate");
  }

  const notes = getNotesByUser(user.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <Link
          href="/notes/new"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="mt-8 text-center text-foreground/60">
          No notes yet. Create your first note!
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {notes.map((note) => (
            <li key={note.id}>
              <Link
                href={`/notes/${note.id}`}
                className="block rounded-md border border-foreground/10 px-4 py-3 transition-colors hover:bg-foreground/5"
              >
                <span className="font-medium">{note.title}</span>
                <span className="ml-2 text-sm text-foreground/50">
                  {new Date(note.updated_at).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
