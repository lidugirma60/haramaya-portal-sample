import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import {
  getCurrentStudent,
  getDepartments,
  getDepartmentById,
  getFreshmanCourses,
  type Department,
} from "@/lib/data";

export default function Dashboard() {
  const [student, setStudent] = useState(getCurrentStudent());
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    setStudent(getCurrentStudent());
    setDepartments(getDepartments());
  }, []);

  const freshmanCourses = getFreshmanCourses();
  const studentDept = student?.department ? getDepartmentById(student.department) : null;

  const totalFreshmanCredits =
    freshmanCourses.sem1.reduce((a, c) => a + c.credits, 0) +
    freshmanCourses.sem2.reduce((a, c) => a + c.credits, 0);

  return (
    <PortalLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="gradient-hero rounded-xl p-6 lg:p-8 text-primary-foreground animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-primary-foreground/70 text-sm mb-1">Welcome back,</p>
              <h1 className="font-heading text-2xl lg:text-3xl font-bold">
                {student?.fullName || "Student"}
              </h1>
              <p className="text-primary-foreground/80 mt-2">
                {student?.year === 1 ? (
                  "First Year (Freshman) — Common Curriculum"
                ) : studentDept ? (
                  <>Year {student?.year} — {studentDept.name}</>
                ) : (
                  `Year ${student?.year}`
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 bg-primary-foreground/10 rounded-lg">
                <p className="text-2xl font-bold">{student?.id}</p>
                <p className="text-xs text-primary-foreground/70">Student ID</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-elevated p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                📅
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Year {student?.year}</p>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-5 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-2xl">
                🏛️
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {student?.year === 1 ? "Common" : studentDept?.id || "—"}
                </p>
                <p className="text-sm text-muted-foreground">Department</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {student?.year === 1
                    ? freshmanCourses.sem1.length + freshmanCourses.sem2.length
                    : studentDept
                    ? Object.values(studentDept.courses[`year${student?.year}`] || {}).flat().length
                    : 0}
                </p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center text-2xl">
                🎯
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{student?.entranceResult}</p>
                <p className="text-sm text-muted-foreground">Entrance Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Year 1 Notice */}
        {student?.year === 1 && (
          <div className="bg-accent/50 border border-primary/20 rounded-xl p-5 animate-fade-in">
            <div className="flex items-start gap-4">
              <span className="text-3xl">ℹ️</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Freshman Year Information</h3>
                <p className="text-muted-foreground text-sm">
                  As a first-year student, you will complete the common freshman curriculum across
                  two semesters ({totalFreshmanCredits} total credits). Browse any department to
                  see these common courses. Your specific department will be assigned based on
                  your first-year performance and preferences.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Departments Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Browse Departments
            </h2>
            <span className="text-sm text-muted-foreground">{departments.length} departments</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, index) => (
              <Link
                key={dept.id}
                to={`/department/${dept.id}`}
                className="card-elevated p-5 hover:shadow-md transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {dept.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {dept.description.substring(0, 80)}...
                    </p>
                    {student?.department === dept.id && (
                      <span className="inline-block mt-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        Your Department
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
