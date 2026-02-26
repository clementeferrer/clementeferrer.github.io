"use client";

import { MapPin, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { highlightAuthor, getStatusColor } from "@/lib/utils";
import type { Conference } from "@/lib/types";

interface ConferenceCardProps {
  conference: Conference;
}

export default function ConferenceCard({ conference }: ConferenceCardProps) {
  const isSpeaker = conference.role === "speaker";

  return (
    <Card variant="outlined">
      <div className="sm:flex sm:gap-6">
        <div className="sm:w-36 sm:shrink-0 mb-3 sm:mb-0">
          <div className="flex items-center gap-1 text-xs text-muted mb-1">
            <Calendar className="h-3 w-3" />
            {conference.date}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3 w-3" />
            {conference.location}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {isSpeaker ? (
              <Badge className={getStatusColor(conference.role)}>
                Speaker
              </Badge>
            ) : (
              <span className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                Co-Author
              </span>
            )}
          </div>
          <h3 className="font-serif font-semibold mb-1">{conference.title}</h3>
          <p
            className="text-sm text-muted mb-1"
            dangerouslySetInnerHTML={{
              __html: highlightAuthor(conference.authors),
            }}
          />
          {conference.presenter && (
            <p className="text-xs text-muted mb-1">
              Presented by: {conference.presenter}
            </p>
          )}
          <p className="text-sm font-medium">{conference.event}</p>
        </div>
      </div>
    </Card>
  );
}
