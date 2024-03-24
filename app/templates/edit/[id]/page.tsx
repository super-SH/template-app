"use client";

import TemplateForm from "@/components/template-form";
import { Template } from "@/types";
import { useEffect, useState } from "react";

function Page({ params }: { params: { id: string } }) {
  const [template, setTemplate] = useState<Template | null>(null);

  const templateId = params.id;
  useEffect(() => {
    const templates = localStorage.getItem("templates");
    const templatesFromLocalStorage = templates
      ? (JSON.parse(templates) as Template[])
      : [];

    const currentTemplate = templatesFromLocalStorage.filter(
      (template) => template.id === templateId,
    )[0];

    if (currentTemplate) setTemplate(currentTemplate);
  }, [templateId]);

  return (
    <div className="flex h-full items-center justify-center bg-slate-200">
      {template && <TemplateForm template={template} isEdit />}
    </div>
  );
}

export default Page;
