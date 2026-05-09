import React from "react";

export function renderMarkdownLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
          {match[1]}
        </a>
      );
    }
    return part;
  });
}
