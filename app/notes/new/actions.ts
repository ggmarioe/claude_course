"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { createNote } from "@/lib/notes";

const createNoteSchema = z.object({
  title: z.string().max(200).optional(),
  contentJson: z
    .string()
    .max(100_000)
    .refine(
      (val) => {
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid JSON content" },
    ),
});

export async function createNoteAction(formData: FormData) {
  const user = await getCurrentUser(await headers());

  if (!user) {
    redirect("/authenticate");
  }

  const parsed = createNoteSchema.safeParse({
    title: formData.get("title") ?? undefined,
    contentJson: formData.get("contentJson"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const note = createNote(user.id, parsed.data);

  redirect(`/notes/${note.id}`);
}
