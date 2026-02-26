import type { Metadata } from "next";
import { BookOpen, Users } from "lucide-react";
import { getTeaching } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import TAHistory from "@/components/teaching/TAHistory";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

export const metadata: Metadata = {
  title: "Teaching",
  description:
    "Courses taught by Clemente Ferrer.",
};

export default function TeachingPage() {
  const teaching = getTeaching();

  const bySemester = teaching.lecturer.reduce<Record<string, typeof teaching.lecturer>>(
    (acc, course) => {
      (acc[course.semester] ??= []).push(course);
      return acc;
    },
    {}
  );

  const semesters = Object.keys(bySemester).sort((a, b) => b.localeCompare(a));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6">
      <section className="mb-8">
        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Teaching
        </h2>

        <div className="space-y-10">
          {semesters.map((semester) => (
            <div key={semester}>
              <h3 className="font-serif text-xl font-semibold mb-4">
                Semester {semester}
              </h3>
              <div className="space-y-3">
                {bySemester[semester].map((course, index) => (
                  <AnimatedContainer key={course.code} delay={index * 0.04}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 border-b border-border/50 last:border-b-0">
                      <span className="font-mono text-sm text-primary font-medium w-20 shrink-0">
                        {course.code}
                      </span>
                      <span className="font-medium">{course.name}</span>
                      <Badge className="bg-primary/10 text-primary ml-auto">
                        {course.institution}
                      </Badge>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border mb-8" />

      <section>
        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Teaching Assistant
        </h2>
        <TAHistory courses={teaching.ta} />
      </section>
    </div>
  );
}
