import type { Course } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
  disabled?: boolean;
}

export function CourseCard({ course, variant = "default", disabled }: CourseCardProps) {
  return (
    <div
      className={cn(
        "card-elevated p-4 animate-fade-in",
        disabled && "opacity-60",
        variant === "compact" && "p-3"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-medium text-primary bg-accent px-2 py-0.5 rounded">
              {course.code}
            </span>
            {course.prereqs && course.prereqs.length > 0 && (
              <span className="text-xs text-warning bg-warning/10 px-2 py-0.5 rounded">
                Has prerequisites
              </span>
            )}
          </div>
          <h3 className={cn(
            "font-semibold text-foreground",
            variant === "compact" ? "text-sm" : "text-base"
          )}>
            {course.name}
          </h3>
          {course.prereqs && course.prereqs.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Requires: {course.prereqs.join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {course.credits} Cr
          </span>
          <button
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            onClick={() => alert("Syllabus download simulated")}
          >
            📄 Syllabus
          </button>
        </div>
      </div>
    </div>
  );
}
