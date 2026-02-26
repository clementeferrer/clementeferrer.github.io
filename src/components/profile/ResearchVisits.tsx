"use client";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { getFlag } from "@/lib/utils";
import type { ResearchVisit } from "@/lib/types";

interface ResearchVisitsProps {
  visits: ResearchVisit[];
}

export default function ResearchVisits({ visits }: ResearchVisitsProps) {
  return (
    <div className="space-y-2">
      {visits.map((visit, index) => (
        <AnimatedContainer key={index} delay={index * 0.1}>
          <div className="border-l-2 border-border pl-4 py-1">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h3 className="font-medium">{visit.institution}</h3>
              <span className="text-xs text-muted">{visit.dates}</span>
            </div>
            <p className="text-sm text-muted">
              <span className="text-sm">{getFlag(visit.location)}</span>{" "}
              {visit.location}
            </p>
            {visit.host && (
              <p className="text-sm text-muted">Host: {visit.host}</p>
            )}
            <p className="text-sm text-muted mt-1">{visit.description}</p>
          </div>
        </AnimatedContainer>
      ))}
    </div>
  );
}
