import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NewNoteForm } from "./form";

export default async function NewNotePage() {
  const user = await getCurrentUser(await headers());

  if (!user) {
    redirect("/authenticate");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">New Note</h1>
      <NewNoteForm />
    </main>
  );
}
