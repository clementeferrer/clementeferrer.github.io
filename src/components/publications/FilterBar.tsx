"use client";

import { motion } from "framer-motion";

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6" role="tablist">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeFilter === filter
              ? "text-white"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
          role="tab"
          aria-selected={activeFilter === filter}
        >
          {activeFilter === filter && (
            <motion.span
              layoutId="filter-bg"
              className="absolute inset-0 rounded-lg bg-primary"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </button>
      ))}
    </div>
  );
}
