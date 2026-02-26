"use client";

import { ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { highlightAuthor, getStatusColor } from "@/lib/utils";
import type { Publication } from "@/lib/types";

interface PublicationCardProps {
  publication: Publication;
}

const statusBorderColor: Record<string, string> = {
  published: "border-l-emerald-500",
  accepted: "border-l-teal-500",
  submitted: "border-l-amber-500",
  "in-preparation": "border-l-primary/40",
};

export default function PublicationCard({ publication }: PublicationCardProps) {
  const statusLabel = publication.status === "in-preparation" ? "In Preparation" :
    publication.status.charAt(0).toUpperCase() + publication.status.slice(1);

  return (
    <div className={`border-l-2 ${statusBorderColor[publication.status] || ""} pl-4 py-2`}>
      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
        <h3 className="font-serif font-semibold leading-snug uppercase">{publication.title}</h3>
        {publication.year > 0 && <span className="text-xs text-muted">{publication.year}</span>}
        <Badge className={`${getStatusColor(publication.status)} ml-auto`}>
          {statusLabel}
        </Badge>
      </div>
      <p
        className="text-sm text-muted mb-1"
        dangerouslySetInnerHTML={{
          __html: highlightAuthor(publication.authors),
        }}
      />
      {publication.journal && (
        <p className="text-sm font-serif italic text-muted">
          {publication.journal}
          {publication.volume && `, ${publication.volume}`}
          {publication.pages && `, ${publication.pages}`}
        </p>
      )}
      {publication.note && (
        <p className="text-xs text-muted mt-1">({publication.note})</p>
      )}
      {publication.doi && (
        <a
          href={publication.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-1 text-xs text-primary hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          DOI
        </a>
      )}
    </div>
  );
}
