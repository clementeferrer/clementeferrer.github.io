"use client";

import Badge from "@/components/ui/Badge";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { timelineEnter } from "@/lib/animations";
import { formatDate, getTagColor } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

interface NewsTimelineProps {
  news: NewsItem[];
}

export default function NewsTimeline({ news }: NewsTimelineProps) {
  return (
    <div className="space-y-0">
      {news.map((item, index) => (
        <AnimatedContainer key={index} variants={timelineEnter} delay={index * 0.1}>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-primary/40 mt-2.5 shrink-0" />
              {index < news.length - 1 && (
                <div className="w-px flex-1 border-l border-dashed border-border mt-2" />
              )}
            </div>
            <div className="pb-8">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge className={getTagColor(item.tag)}>
                  {item.tag}
                </Badge>
                <span className="text-xs text-muted">
                  {formatDate(item.date)}
                </span>
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted mt-1">{item.description}</p>
            </div>
          </div>
        </AnimatedContainer>
      ))}
    </div>
  );
}
