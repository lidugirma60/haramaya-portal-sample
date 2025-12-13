import { useState } from "react";
import { cn } from "@/lib/utils";
import { CourseCard } from "./CourseCard";
import type { Course } from "@/lib/data";

interface SemesterTabsProps {
  sem1Courses: Course[];
  sem2Courses: Course[];
  disabled?: boolean;
}

export function SemesterTabs({ sem1Courses, sem2Courses, disabled }: SemesterTabsProps) {
  const [activeTab, setActiveTab] = useState<"sem1" | "sem2">("sem1");

  const courses = activeTab === "sem1" ? sem1Courses : sem2Courses;
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-border mb-6" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === "sem1"}
          onClick={() => setActiveTab("sem1")}
          className={cn(
            "px-6 py-3 text-sm font-medium transition-all duration-200 -mb-px",
            activeTab === "sem1" ? "tab-active" : "tab-inactive"
          )}
        >
          Semester 1
          <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {sem1Courses.length}
          </span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "sem2"}
          onClick={() => setActiveTab("sem2")}
          className={cn(
            "px-6 py-3 text-sm font-medium transition-all duration-200 -mb-px",
            activeTab === "sem2" ? "tab-active" : "tab-inactive"
          )}
        >
          Semester 2
          <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {sem2Courses.length}
          </span>
        </button>
      </div>

      {/* Credits summary */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm text-muted-foreground">
          {courses.length} courses available
        </p>
        <p className="text-sm font-medium text-primary">
          Total: {totalCredits} Credits
        </p>
      </div>

      {/* Course list */}
      {courses.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {courses.map((course, index) => (
            <div
              key={course.code}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CourseCard course={course} disabled={disabled} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">No courses available for this semester</p>
        </div>
      )}
    </div>
  );
}
