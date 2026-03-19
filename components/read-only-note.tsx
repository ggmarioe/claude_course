"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ReadOnlyNote({ contentJson }: { contentJson: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [StarterKit],
    content: JSON.parse(contentJson),
  });

  return <EditorContent editor={editor} className="tiptap" />;
}
