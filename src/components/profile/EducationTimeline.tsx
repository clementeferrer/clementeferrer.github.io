"use client";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { Education } from "@/lib/types";

interface EducationTimelineProps {
  education: Education[];
}

export default function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="space-y-2">
      {education.map((edu, index) => (
        <AnimatedContainer key={index} delay={index * 0.1}>
          <div className="border-l-2 border-border pl-4 py-1">
            <h3 className="font-medium">{edu.degree}</h3>
            <p className="text-sm text-muted">
              {edu.institution} &middot; {edu.location}
            </p>
            <div className="flex gap-3 mt-1 text-xs text-muted">
              <span>{edu.year || edu.years}</span>
            </div>
          </div>
        </AnimatedContainer>
      ))}
    </div>
  );
}
