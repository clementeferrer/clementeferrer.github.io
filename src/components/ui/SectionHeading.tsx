"use client";

import AnimatedContainer from "./AnimatedContainer";
import { headingFade } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  decoration?: "line" | "dot" | "none";
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  decoration = "line",
  align = "left",
}: SectionHeadingProps) {
  return (
    <AnimatedContainer
      variants={headingFade}
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
    >
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {decoration === "dot" && (
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        )}
        <h2 className="text-heading-1 font-serif font-bold tracking-tight">
          {title}
        </h2>
      </div>
      {decoration === "line" && (
        <span className="block h-px w-12 bg-primary/40 mt-3" />
      )}
      {subtitle && (
        <p className="mt-4 text-lg text-muted max-w-2xl">
          {subtitle}
        </p>
      )}
    </AnimatedContainer>
  );
}
