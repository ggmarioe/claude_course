"use client";

import { NoteEditor } from "@/components/note-editor";
import { createNoteAction } from "./actions";

export function NewNoteForm() {
  return (
    <form action={createNoteAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Untitled note"
          className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm outline-none focus-visible:border-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground/20"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Content</label>
        <NoteEditor hiddenInputName="contentJson" />
      </div>

      <button
        type="submit"
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2"
      >
        Create Note
      </button>
    </form>
  );
}
