import { get, query, run } from "@/lib/db";
import { randomUUID } from "node:crypto";

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content_json: string;
  is_public: number;
  public_slug: string | null;
  created_at: string;
  updated_at: string;
};

const EMPTY_DOC = JSON.stringify({
  type: "doc",
  content: [{ type: "paragraph" }],
});

export function createNote(
  userId: string,
  data: { title?: string; contentJson?: string },
): Note {
  const id = randomUUID();
  const title = data.title?.trim() || "Untitled note";
  const contentJson = data.contentJson || EMPTY_DOC;

  run(
    `INSERT INTO notes (id, user_id, title, content_json) VALUES (?, ?, ?, ?)`,
    [id, userId, title, contentJson],
  );

  return get<Note>(`SELECT * FROM notes WHERE id = ?`, [id])!;
}

export function getNoteByIdForUser(
  noteId: string,
  userId: string,
): Note | undefined {
  return get<Note>(`SELECT * FROM notes WHERE id = ? AND user_id = ?`, [
    noteId,
    userId,
  ]);
}

export function getNotesByUser(userId: string): Note[] {
  return query<Note>(
    `SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC`,
    [userId],
  );
}

export function getNoteByPublicSlug(slug: string): Note | undefined {
  return get<Note>(
    `SELECT * FROM notes WHERE public_slug = ? AND is_public = 1`,
    [slug],
  );
}
