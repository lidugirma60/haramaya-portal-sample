import { useState, useEffect } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import {
  getCurrentStudent,
  getDepartments,
  getDepartmentById,
  updateStudent,
  type Department,
  type Student,
} from "@/lib/data";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const [student, setStudent] = useState<Student | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");

  useEffect(() => {
    setStudent(getCurrentStudent());
    setDepartments(getDepartments());
  }, []);

  const studentDept = student?.department ? getDepartmentById(student.department) : null;

  const handleDepartmentRequest = () => {
    if (!selectedDept || !student) return;

    const updated = {
      ...student,
      department: selectedDept,
      departmentPending: true,
    };
    updateStudent(updated);
    setStudent(updated);
    setShowDeptModal(false);
    toast({
      title: "Department Request Submitted",
      description: "Your department selection is pending approval.",
    });
  };

  if (!student) {
    return (
      <PortalLayout title="Profile">
        <div className="skeleton h-96 rounded-xl" />
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title="My Profile">
      <div className="max-w-4xl space-y-6">
        {/* Profile Header */}
        <div className="card-elevated overflow-hidden animate-fade-in">
          <div className="gradient-primary h-32" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <div className="w-24 h-24 rounded-xl bg-card border-4 border-card flex items-center justify-center text-4xl font-heading font-bold text-primary shadow-lg">
                {student.fullName.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  {student.fullName}
                </h1>
                <p className="text-muted-foreground">
                  {student.year === 1
                    ? "First Year (Freshman)"
                    : studentDept
                    ? `Year ${student.year} — ${studentDept.name}`
                    : `Year ${student.year}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Student ID</p>
                <p className="font-mono font-bold text-primary">{student.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Department Status */}
        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            Department Status
          </h2>

          {student.year === 1 ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-accent/50 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">
                  {student.department ? (
                    <>Selected: {getDepartmentById(student.department)?.name}</>
                  ) : (
                    "Department: Not Assigned"
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {student.departmentPending
                    ? "Your department selection is pending advisor approval."
                    : "As a freshman, you may request a department preference."}
                </p>
              </div>
              {!student.departmentPending && (
                <button
                  onClick={() => setShowDeptModal(true)}
                  className="btn-primary whitespace-nowrap"
                >
                  Choose Department
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                {studentDept?.icon || "🏛️"}
              </div>
              <div>
                <p className="font-medium text-foreground">{studentDept?.name || "No Department"}</p>
                <p className="text-sm text-muted-foreground">Year {student.year} Student</p>
              </div>
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            Personal Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium text-foreground">{student.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Father's Name</p>
              <p className="font-medium text-foreground">{student.fatherName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mother's Name</p>
              <p className="font-medium text-foreground">{student.motherName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium text-foreground">
                {new Date(student.dob).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{student.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">{student.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Entrance Result</p>
              <p className="font-medium text-foreground">{student.entranceResult}/500</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium text-foreground">{student.username}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            Address
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Region</p>
              <p className="font-medium text-foreground">{student.address.region}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Zone</p>
              <p className="font-medium text-foreground">{student.address.zone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Woreda</p>
              <p className="font-medium text-foreground">{student.address.woreda}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kebele</p>
              <p className="font-medium text-foreground">{student.address.kebele}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Selection Modal */}
      {showDeptModal && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-md w-full p-6 animate-scale-in">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              Choose Department
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Select your preferred department. This will be submitted for advisor approval.
            </p>

            <select
              className="input-field mb-6"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeptModal(false)}
                className="flex-1 btn-ghost border border-border"
              >
                Cancel
              </button>
              <button
                onClick={handleDepartmentRequest}
                disabled={!selectedDept}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
