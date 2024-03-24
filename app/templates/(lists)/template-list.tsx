"use client";

import { Template } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function TemplateList() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const templates = localStorage.getItem("templates");
    const templatesFromLocalStorage = templates
      ? (JSON.parse(templates) as Template[])
      : [];

    if (templatesFromLocalStorage) {
      setTemplates(templatesFromLocalStorage);
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto rounded-md bg-slate-500 px-4 py-6 shadow-lg">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex items-center justify-between rounded-sm border border-slate-200 p-2"
        >
          <p>{template.id}</p>

          <div className="flex gap-2">
            <button
              onClick={() => {
                router.push(`/templates/edit/${template.id}`);
              }}
            >
              edit
            </button>
            <button>filldata</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TemplateList;
