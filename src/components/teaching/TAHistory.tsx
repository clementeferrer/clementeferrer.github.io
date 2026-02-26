import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { TACourse } from "@/lib/types";

interface TAHistoryProps {
  courses: TACourse[];
}

export default function TAHistory({ courses }: TAHistoryProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {courses.map((course, index) => (
        <AnimatedContainer key={index} delay={index * 0.04}>
          <div className="border-l-2 border-border pl-4 py-1">
            <p className="font-medium text-sm">{course.name}</p>
          </div>
        </AnimatedContainer>
      ))}
    </div>
  );
}
