"use client";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { ResearchProject } from "@/lib/types";

interface ResearchProjectsProps {
  projects: ResearchProject[];
}

export default function ResearchProjects({ projects }: ResearchProjectsProps) {
  return (
    <div className="space-y-2">
      {projects.map((project, index) => (
        <AnimatedContainer key={index} delay={index * 0.1}>
          <div className="border-l-2 border-border pl-4 py-1">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h3 className="font-medium">{project.code}</h3>
              <span className="text-xs text-muted">{project.years}</span>
            </div>
            <p className="text-sm text-muted">{project.role}{project.institution && ` · ${project.institution}`}</p>
            <p className="text-sm text-muted italic mt-1">{project.title}</p>
          </div>
        </AnimatedContainer>
      ))}
    </div>
  );
}
