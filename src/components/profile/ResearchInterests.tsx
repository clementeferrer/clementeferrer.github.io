"use client";

import { TrendingUp, Brain, Cpu, Map } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { staggerFast, cardEnter } from "@/lib/animations";
import { motion } from "framer-motion";
import type { ResearchInterest } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Brain,
  Cpu,
  Map,
};

interface ResearchInterestsProps {
  interests: ResearchInterest[];
}

export default function ResearchInterests({ interests }: ResearchInterestsProps) {
  return (
    <AnimatedContainer variants={staggerFast} className="grid gap-4 sm:grid-cols-2">
      {interests.map((interest) => {
        const Icon = iconMap[interest.icon] || Cpu;
        return (
          <motion.div
            key={interest.name}
            variants={cardEnter}
            className="border-l-2 border-primary/20 pl-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className="h-4 w-4 text-primary" />
              <h3 className="font-medium">{interest.name}</h3>
            </div>
            <p className="text-sm text-muted">{interest.description}</p>
          </motion.div>
        );
      })}
    </AnimatedContainer>
  );
}
