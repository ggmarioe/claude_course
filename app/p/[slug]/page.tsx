import { notFound } from "next/navigation";
import { getNoteByPublicSlug } from "@/lib/notes";
import { ReadOnlyNote } from "@/components/read-only-note";

export default async function PublicNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNoteByPublicSlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <div className="mt-6">
        <ReadOnlyNote contentJson={note.content_json} />
      </div>
    </main>
  );
}
