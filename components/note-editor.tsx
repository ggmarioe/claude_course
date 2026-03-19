"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const btnBase =
  "rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-foreground/10";
const btnActive = "bg-foreground/15";

function ToolbarButton({
  command,
  isActive,
  label,
}: {
  command: () => void;
  isActive: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={command}
      aria-pressed={isActive}
      className={`${btnBase} ${isActive ? btnActive : ""}`}
    >
      {label}
    </button>
  );
}

export function NoteEditor({
  hiddenInputName,
}: {
  hiddenInputName: string;
}) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } })],
    editorProps: {
      attributes: {
        class:
          "tiptap min-h-[300px] px-4 py-3 outline-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      if (hiddenRef.current) {
        hiddenRef.current.value = JSON.stringify(editor.getJSON());
      }
    },
  });

  const toolbar = editor
    ? [
        {
          label: "Bold",
          command: () => editor.chain().focus().toggleBold().run(),
          active: editor.isActive("bold"),
        },
        {
          label: "Italic",
          command: () => editor.chain().focus().toggleItalic().run(),
          active: editor.isActive("italic"),
        },
        {
          label: "H1",
          command: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          active: editor.isActive("heading", { level: 1 }),
        },
        {
          label: "H2",
          command: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          active: editor.isActive("heading", { level: 2 }),
        },
        {
          label: "H3",
          command: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
          active: editor.isActive("heading", { level: 3 }),
        },
        {
          label: "Bullet List",
          command: () => editor.chain().focus().toggleBulletList().run(),
          active: editor.isActive("bulletList"),
        },
        {
          label: "Code",
          command: () => editor.chain().focus().toggleCode().run(),
          active: editor.isActive("code"),
        },
        {
          label: "Code Block",
          command: () => editor.chain().focus().toggleCodeBlock().run(),
          active: editor.isActive("codeBlock"),
        },
        {
          label: "Rule",
          command: () => editor.chain().focus().setHorizontalRule().run(),
          active: false,
        },
      ]
    : [];

  return (
    <div className="overflow-hidden rounded-md border border-foreground/20">
      <div
        className="flex flex-wrap gap-1 border-b border-foreground/10 bg-foreground/5 px-2 py-1.5"
        role="toolbar"
        aria-label="Text formatting"
      >
        {toolbar.map((item) => (
          <ToolbarButton
            key={item.label}
            command={item.command}
            isActive={item.active}
            label={item.label}
          />
        ))}
      </div>
      <EditorContent editor={editor} />
      <input
        ref={hiddenRef}
        type="hidden"
        name={hiddenInputName}
        defaultValue={JSON.stringify({ type: "doc", content: [{ type: "paragraph" }] })}
      />
    </div>
  );
}
