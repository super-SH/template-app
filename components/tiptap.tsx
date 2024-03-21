"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

type EditorProps = {
  content: string;
  onChange: (content: string) => void;
};

function TipTapEditor({ onChange, content }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      console.log(editor.getJSON());
      console.log(editor.getHTML());

      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-l border-r border-b border-slate-800 bg-white text-slate-700 items-start w-full gap-3 font-medium text-lg pt-4 rounded-bl-md rounded-br-md outline-none ",
      },
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTapEditor;
