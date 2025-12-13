import { useState, useEffect } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import {
  getCurrentStudent,
  getDepartments,
  updateStudent,
  type Student,
  type Department,
} from "@/lib/data";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const [student, setStudent] = useState<Student | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    setStudent(getCurrentStudent());
    setDepartments(getDepartments());
  }, []);

  const handleYearChange = (newYear: number) => {
    if (!student) return;

    const updated = { ...student, year: newYear };
    // If changing to year 1, keep or clear department based on logic
    if (newYear === 1) {
      updated.department = null;
    }
    updateStudent(updated);
    setStudent(updated);
    toast({
      title: "Year Updated",
      description: `You are now set as Year ${newYear}. Refresh to see updated courses.`,
    });
  };

  const handleDepartmentChange = (deptId: string) => {
    if (!student) return;

    const updated = { ...student, department: deptId || null, departmentPending: false };
    updateStudent(updated);
    setStudent(updated);
    toast({
      title: "Department Updated",
      description: deptId
        ? `Department changed to ${departments.find((d) => d.id === deptId)?.name}`
        : "Department cleared",
    });
  };

  if (!student) {
    return (
      <PortalLayout title="Settings">
        <div className="skeleton h-96 rounded-xl" />
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        {/* Test Controls */}
        <div className="card-elevated p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🧪</span>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Testing Controls
              </h2>
              <p className="text-sm text-muted-foreground">
                Simulate year/department changes for testing purposes
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Year Simulation */}
            <div>
              <label className="label-text">Simulate Year Level</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      student.year === year
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Year {year}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Changing year affects which courses you see in departments
              </p>
            </div>

            {/* Department Assignment */}
            <div>
              <label className="label-text">Assign Department</label>
              <select
                className="input-field"
                value={student.department || ""}
                onChange={(e) => handleDepartmentChange(e.target.value)}
              >
                <option value="">No Department (Freshman Default)</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                For Year 2+, this determines your enrolled department
              </p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates about courses</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-primary relative transition-colors">
                <span className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <button className="btn-ghost text-sm border border-border">Enable</button>
            </div>
          </div>
        </div>

        {/* Current State Display */}
        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            Current Student State
          </h2>
          <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto text-muted-foreground">
            {JSON.stringify(
              {
                id: student.id,
                fullName: student.fullName,
                year: student.year,
                department: student.department,
                departmentPending: student.departmentPending,
              },
              null,
              2
            )}
          </pre>
        </div>

        {/* Danger Zone */}
        <div className="card-elevated p-6 border-destructive/30 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2 className="font-heading text-lg font-semibold text-destructive mb-4">
            Danger Zone
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your student account
              </p>
            </div>
            <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/20 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
