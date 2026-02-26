"use client";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { staggerFast, cardEnter } from "@/lib/animations";
import { motion } from "framer-motion";
import type { Skills, Language } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  programming: "Programming",
  ml: "ML & Data Science",
  dl: "Deep Learning",
  llm: "LLM Frameworks",
  mlops: "MLOps",
  databases: "Databases",
  software: "Software",
  os: "Operating Systems",
};

interface SkillsSectionProps {
  skills: Skills;
  languages: Language[];
}

export default function SkillsSection({ skills, languages }: SkillsSectionProps) {
  const skillMap = skills as unknown as Record<string, string[]>;
  const entries = Object.entries(categoryLabels).filter(
    ([key]) => skillMap[key]?.length > 0
  );

  return (
    <AnimatedContainer variants={staggerFast} className="flex flex-wrap gap-x-8 gap-y-3">
      {entries.map(([key, label]) => (
        <motion.div key={key} variants={cardEnter} className="min-w-0">
          <p className="text-sm font-semibold mb-0.5">{label}</p>
          <p className="text-sm text-muted">
            {skillMap[key].join(", ")}
          </p>
        </motion.div>
      ))}
      {languages.length > 0 && (
        <motion.div variants={cardEnter} className="min-w-0">
          <p className="text-sm font-semibold mb-0.5">Languages</p>
          <p className="text-sm text-muted">
            {languages.map((l) => `${l.name} (${l.level})`).join(", ")}
          </p>
        </motion.div>
      )}
    </AnimatedContainer>
  );
}
