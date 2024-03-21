import React from "react";
import Link from "next/link";

function Page() {
  return (
    <nav className="flex items-center justify-between gap-3">
      <Link
        href={"/templates/create"}
        className="rounded-md border border-slate-900 px-5 py-4"
      >
        New Template
      </Link>
      <Link
        href={"/templates"}
        className="rounded-md border border-slate-900 px-5 py-4"
      >
        Template List
      </Link>
    </nav>
  );
}

export default Page;
