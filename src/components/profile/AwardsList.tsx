"use client";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { Award } from "@/lib/types";

interface AwardsListProps {
  awards: Award[];
}

export default function AwardsList({ awards }: AwardsListProps) {
  return (
    <div className="space-y-2">
      {awards.map((award, index) => (
        <AnimatedContainer key={index} delay={index * 0.1}>
          <div className="border-l-2 border-border pl-4 py-1">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h3 className="font-medium">{award.title}</h3>
              <span className="text-xs text-muted">{award.year || award.years}</span>
            </div>
            <p className="text-sm text-muted">{award.organization}</p>
            <p className="text-sm text-muted mt-1">{award.description}</p>
          </div>
        </AnimatedContainer>
      ))}
    </div>
  );
}
