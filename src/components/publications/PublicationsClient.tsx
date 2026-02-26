"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import FilterBar from "@/components/publications/FilterBar";
import PublicationCard from "@/components/publications/PublicationCard";
import ExportButton from "@/components/publications/ExportButton";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { Publication } from "@/lib/types";

const pubFilters = ["All", "Published", "Accepted", "Submitted", "In Preparation"];

interface PublicationsClientProps {
  publications: Publication[];
}

export default function PublicationsClient({
  publications,
}: PublicationsClientProps) {
  const [pubFilter, setPubFilter] = useState("All");

  const filteredPubs =
    pubFilter === "All"
      ? publications
      : publications.filter(
          (p) =>
            p.status === pubFilter.toLowerCase().replace(" ", "-")
        );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="pt-12 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-serif font-bold mb-1 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Publications
            </h2>
          </div>
          <ExportButton publications={publications} />
        </div>
        <FilterBar
          filters={pubFilters}
          activeFilter={pubFilter}
          onFilterChange={setPubFilter}
        />
        <p className="text-sm text-muted mb-4">
          Showing {filteredPubs.length} of {publications.length} publications
        </p>
        <div className="space-y-3">
          {filteredPubs.map((pub, index) => (
            <AnimatedContainer key={index} delay={index * 0.05}>
              <PublicationCard publication={pub} />
            </AnimatedContainer>
          ))}
          {filteredPubs.length === 0 && (
            <p className="text-muted text-center py-8">
              No publications match this filter.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
