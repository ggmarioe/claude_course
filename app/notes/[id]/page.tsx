import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getNoteByIdForUser } from "@/lib/notes";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser(await headers());

  if (!user) {
    redirect("/authenticate");
  }

  const { id } = await params;
  const note = getNoteByIdForUser(id, user.id);

  if (!note) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Last updated: {new Date(note.updated_at).toLocaleDateString()}
      </p>
      <div
        className="tiptap mt-6"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
      <pre className="mt-6 whitespace-pre-wrap rounded-md bg-foreground/5 p-4 text-sm">
        {note.content_json}
      </pre>
    </main>
  );
}
