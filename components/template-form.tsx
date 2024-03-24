"use client";

import React, { useState } from "react";
import TipTapEditor from "./tiptap";
import { v4 as uuidv4 } from "uuid";
import { Template } from "@/types";
import { useRouter } from "next/navigation";

type TemplateFormProp = {
  template?: Template;
  isEdit?: boolean;
};

function TemplateForm({ template, isEdit = false }: TemplateFormProp) {
  const router = useRouter();
  const [templateContent, setTemplateContent] = useState(
    () => template?.content || "<p>create your template here ...</p>",
  );

  function handleEditorChange(content: string) {
    setTemplateContent(content);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const templates = localStorage.getItem("templates");
    const templatesFromLocalStorage = templates
      ? (JSON.parse(templates) as Template[])
      : [];

    if (isEdit && template) {
      const updatedTemplate = {
        id: template.id,
        content: templateContent,
      };

      const filterTemplatesData = templatesFromLocalStorage.filter(
        (temp) => temp.id !== template.id,
      );

      const updatedTemplatesData = [...filterTemplatesData, updatedTemplate];

      localStorage.setItem("templates", JSON.stringify(updatedTemplatesData));
    }

    if (!isEdit) {
      const newTemplate = {
        id: uuidv4(),
        content: templateContent,
      } as Template;

      const updatedTemplatesData = [...templatesFromLocalStorage, newTemplate];
      localStorage.setItem("templates", JSON.stringify(updatedTemplatesData));
    }

    setTemplateContent("");
    router.push("/");
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
          {isEdit ? "Edit Template" : "Create Template"}
        </button>
      </div>
    </form>
  );
}

export default TemplateForm;
