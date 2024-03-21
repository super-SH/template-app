"use client";

import React, { useEffect, useState } from "react";
import TipTapEditor from "./tiptap";
import { v4 as uuidv4 } from "uuid";

function TemplateForm() {
  const [templateContent, setTemplateContent] = useState(
    "<p>Hello, {{your name}}</p>",
  );

  useEffect(
    function () {
      console.log(templateContent);
    },
    [templateContent],
  );

  function handleEditorChange(content: string) {
    setTemplateContent(content);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTemplate = {
      id: uuidv4(),
      content: templateContent,
    };

    const templates = localStorage.getItem("templates");
    const templatesFromLocalStorage = templates ? JSON.parse(templates) : [];

    const updatedTemplatesData = [...templatesFromLocalStorage, newTemplate];
    localStorage.setItem("templates", JSON.stringify(updatedTemplatesData));

    setTemplateContent("");
  }

  return (
    <form
      className="flex w-full flex-col items-center gap-3 px-12"
      onSubmit={handleSubmit}
    >
      <TipTapEditor onChange={handleEditorChange} content={templateContent} />
      <div>
        <button
          type="submit"
          className="focus-visible:ring-ring inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
        >
          Create Template
        </button>
      </div>
    </form>
  );
}

export default TemplateForm;
