import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { SemesterTabs } from "@/components/portal/SemesterTabs";
import {
  getDepartmentById,
  getCurrentStudent,
  getFreshmanCourses,
  type Department,
  type Student,
} from "@/lib/data";

export default function DepartmentDetail() {
  const { deptId } = useParams<{ deptId: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deptId) {
      const dept = getDepartmentById(deptId);
      setDepartment(dept || null);
      setStudent(getCurrentStudent());
      setLoading(false);
    }
  }, [deptId]);

  if (loading) {
    return (
      <PortalLayout title="Loading...">
        <div className="space-y-4">
          <div className="skeleton h-32 rounded-xl" />
          <div className="skeleton h-64 rounded-xl" />
        </div>
      </PortalLayout>
    );
  }

  if (!department) {
    return <Navigate to="/dashboard" replace />;
  }

  const freshmanCourses = getFreshmanCourses();
  const isFirstYear = student?.year === 1;
  const isOwnDepartment = student?.department === department.id;
  const yearKey = `year${student?.year}`;
  const departmentCourses = department.courses[yearKey] || { sem1: [], sem2: [] };

  return (
    <PortalLayout title={department.name}>
      <div className="space-y-6">
        {/* Department Header */}
        <div className="card-elevated overflow-hidden animate-fade-in">
          <div className="gradient-primary p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-4xl">
                {department.icon}
              </div>
              <div className="flex-1">
                <h1 className="font-heading text-2xl lg:text-3xl font-bold text-primary-foreground">
                  {department.name}
                </h1>
                <p className="text-primary-foreground/80 mt-2 max-w-2xl">
                  {department.description}
                </p>
                {isOwnDepartment && (
                  <span className="inline-block mt-3 text-sm bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full">
                    ✓ Your Department
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {isFirstYear ? (
            <>
              {/* Freshman Courses */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Freshman Courses
                  </h2>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    Common Curriculum
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  As a freshman, you take the same foundational courses regardless of which
                  department you browse. These courses prepare you for department-specific
                  studies starting from Year 2.
                </p>
              </div>

              <SemesterTabs
                sem1Courses={freshmanCourses.sem1}
                sem2Courses={freshmanCourses.sem2}
              />

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  💡 Tip: Department-specific courses will be available when you advance to
                  Year 2 and receive your department assignment.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Department-Specific Courses */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Year {student?.year} Courses
                  </h2>
                  {!isOwnDepartment && (
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                      View Only
                    </span>
                  )}
                </div>
                {!isOwnDepartment && (
                  <p className="text-muted-foreground text-sm mb-6">
                    You are viewing courses for {department.name}. These courses are not
                    available for enrollment as you belong to a different department.
                  </p>
                )}
              </div>

              {departmentCourses.sem1.length > 0 || departmentCourses.sem2.length > 0 ? (
                <SemesterTabs
                  sem1Courses={departmentCourses.sem1}
                  sem2Courses={departmentCourses.sem2}
                  disabled={!isOwnDepartment}
                />
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed border-border">
                  <p className="text-muted-foreground">
                    No courses available for Year {student?.year} in this department.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Course data may not be configured for this year level yet.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Available Years Preview (for upper-year students) */}
        {!isFirstYear && (
          <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="font-semibold text-foreground mb-4">
              Available Course Years in {department.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(department.courses).map((yearKey) => {
                const yearNum = yearKey.replace("year", "");
                const isCurrentYear = `year${student?.year}` === yearKey;
                return (
                  <span
                    key={yearKey}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isCurrentYear
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    Year {yearNum}
                    {isCurrentYear && " (Current)"}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
