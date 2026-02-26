"use client";

import { Mic } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { getFlag } from "@/lib/utils";
import type { Conference } from "@/lib/types";

const MONTHS: Record<string, number> = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

function parseMonth(dateStr: string): number {
  const month = dateStr.split(" ")[0];
  return MONTHS[month] || 0;
}

interface ConferenceListProps {
  conferences: Conference[];
}

export default function ConferenceList({ conferences }: ConferenceListProps) {
  const byYear = conferences.reduce<Record<number, Conference[]>>((acc, conf) => {
    (acc[conf.year] ??= []).push(conf);
    return acc;
  }, {});

  // Sort within each year by month descending
  for (const year of Object.keys(byYear)) {
    byYear[Number(year)].sort((a, b) => parseMonth(b.date) - parseMonth(a.date));
  }

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-serif font-bold mb-1 flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Conferences &amp; Academic Travels
        </h2>
      </div>

      <div className="space-y-8">
        {years.map((year) => (
          <div key={year}>
            <h3 className="font-serif text-xl font-semibold mb-4">{year}</h3>
            <div className="space-y-4">
              {byYear[year].map((conf, index) => (
                <AnimatedContainer key={index} delay={index * 0.05}>
                  <div className="border-l-2 border-primary/30 pl-5">
                    <h4 className="font-serif font-semibold leading-snug">
                      {conf.title}
                    </h4>
                    <p
                      className="text-sm text-muted mt-1"
                      dangerouslySetInnerHTML={{
                        __html: conf.authors
                          .map((a) =>
                            a.includes("Ferrer")
                              ? `<strong class="text-primary font-semibold">${a}</strong>`
                              : a
                          )
                          .join(", "),
                      }}
                    />
                    <p className="text-sm mt-1">
                      <span className="font-medium">{conf.event}</span>
                    </p>
                    <p className="text-sm text-muted mt-0.5">
                      <span className="text-sm">{getFlag(conf.location)}</span>{" "}
                      {conf.location} &middot; {conf.date}
                    </p>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
