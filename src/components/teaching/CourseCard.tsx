import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { LecturerCourse } from "@/lib/types";

interface CourseCardProps {
  course: LecturerCourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  const isUTFSM = course.institution.includes("Santa María") || course.institution.includes("UTFSM");
  const borderColor = isUTFSM ? "border-t-primary" : "border-t-accent";

  return (
    <Card className={`border-t-2 ${borderColor}`}>
      <Badge className="bg-primary/10 text-primary mb-3">{course.code}</Badge>
      <h3 className="font-semibold mb-1">{course.name}</h3>
      <p className="text-sm text-muted">{course.institution}</p>
      <p className="text-xs text-muted mt-1">Semester {course.semester}</p>
    </Card>
  );
}
