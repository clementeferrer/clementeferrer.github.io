import type { ReactNode } from "react";

interface TimelineProps {
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-accent md:before:mx-auto md:before:left-0 md:before:right-0">
      {children}
    </div>
  );
}

interface TimelineItemProps {
  children: ReactNode;
  year?: string;
}

export function TimelineItem({ children, year }: TimelineItemProps) {
  return (
    <div className="relative flex items-start gap-6 md:gap-8">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/25">
          {year ? year.slice(-2) : "•"}
        </div>
      </div>
      <div className="flex-1 pb-2">{children}</div>
    </div>
  );
}
