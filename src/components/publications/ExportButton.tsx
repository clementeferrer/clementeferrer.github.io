"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";
import { generateBibTeX } from "@/lib/utils";
import type { Publication } from "@/lib/types";

interface ExportButtonProps {
  publications: Publication[];
}

export default function ExportButton({ publications }: ExportButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    const publishedPubs = publications.filter((p) => p.status === "published");
    const bibtex = publishedPubs.map(generateBibTeX).join("\n\n");
    const blob = new Blob([bibtex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ferrer-publications.bib";
    a.click();
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-all hover:bg-surface-hover hover:border-primary/30"
    >
      {downloaded ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" />
          Downloaded!
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export BibTeX
        </>
      )}
    </button>
  );
}
