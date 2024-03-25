"use client";

import { extractDynamicVariables } from "@/lib/utils";
import { Template } from "@/types";
import { useEffect, useState } from "react";
import FillDataFrom from "./fill-data-form";

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

  let variables = [] as string[];

  if (template) variables = extractDynamicVariables(template.content);

  return (
    <div className="flex h-full items-center justify-center bg-slate-200">
      {!variables?.length && (
        <p>This template dont have dynamic value . Its a static template</p>
      )}
      {variables.length > 0 && <FillDataFrom variables={variables} />}
    </div>
  );
}

export default Page;
