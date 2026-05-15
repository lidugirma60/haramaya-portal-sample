import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getStudents,
  saveStudents,
  getDepartments,
  generateStudentId,
  isUsernameTaken,
  isEmailTaken,
  seedDataIfEmpty,
  type Student,
  type Department,
} from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Register() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    entranceResult: "",
    year: "1",
    department: "",
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
  });

  useEffect(() => {
    seedDataIfEmpty();
    setDepartments(getDepartments());
  }, []);

  const validateStep1 = (): string[] => {
    const errs: string[] = [];
    if (!formData.fullName.trim()) errs.push("Full name is required");
    if (!formData.fatherName.trim()) errs.push("Father's name is required");
    if (!formData.motherName.trim()) errs.push("Mother's name is required");
    if (!formData.dob) errs.push("Date of birth is required");
    else {
      const dobDate = new Date(formData.dob);
      if (dobDate >= new Date()) errs.push("Date of birth must be in the past");
    }
    return errs;
  };

  const validateStep2 = (): string[] => {
    const errs: string[] = [];
    if (!formData.username || formData.username.length < 4) {
      errs.push("Username must be at least 4 characters");
    }
    if (isUsernameTaken(formData.username)) {
      errs.push("Username is already taken");
    }
    if (formData.password.length < 8) {
      errs.push("Password must be at least 8 characters");
    }
    if (formData.password !== formData.confirmPassword) {
      errs.push("Passwords do not match");
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.push("Valid email is required");
    }
    if (isEmailTaken(formData.email)) {
      errs.push("Email is already registered");
    }
    if (!formData.phone) {
      errs.push("Phone number is required");
    }
    return errs;
  };

  const validateStep3 = (): string[] => {
    const errs: string[] = [];
    const entrance = parseInt(formData.entranceResult);
    if (isNaN(entrance) || entrance < 0 || entrance > 500) {
      errs.push("Entrance result must be between 0 and 500");
    }
    const year = parseInt(formData.year);
    if (year >= 2 && !formData.department) {
      errs.push("Department is required for Year 2 and above");
    }
    if (!formData.region || !formData.zone || !formData.woreda || !formData.kebele) {
      errs.push("Complete address is required");
    }
    return errs;
  };

  const handleNext = () => {
    let validationErrors: string[] = [];
    if (step === 1) validationErrors = validateStep1();
    if (step === 2) validationErrors = validateStep2();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep3();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const year = parseInt(formData.year);
    const studentId = generateStudentId(year);

    const newStudent: Student = {
      id: studentId,
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      year,
      department: year >= 2 ? formData.department : null,
      entranceResult: parseInt(formData.entranceResult),
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      address: {
        region: formData.region,
        zone: formData.zone,
        woreda: formData.woreda,
        kebele: formData.kebele,
      },
      phone: formData.phone,
      email: formData.email,
    };

    const students = getStudents();
    students.push(newStudent);
    saveStudents(students);

    navigate("/register-success", { state: { studentId, year } });
  };

  const inputClass = "input-field";

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary mb-4">
            <span className="text-xl font-bold text-primary-foreground">HU</span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Student Registration
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome to Haramaya University — register to access your student dashboard
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-1 mx-1 rounded transition-all ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card-elevated p-6 lg:p-8">
          {errors.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 animate-fade-in">
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, i) => (
                  <li key={i} className="text-sm text-destructive">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Personal Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Full Name *</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Date of Birth *</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Father's Name *</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Enter father's name"
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Mother's Name *</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Enter mother's name"
                      value={formData.motherName}
                      onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Account Info */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Account Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Username *</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Choose a username (min 4 chars)"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Email *</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Password *</label>
                    <input
                      type="password"
                      className={inputClass}
                      placeholder="Min 8 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Confirm Password *</label>
                    <input
                      type="password"
                      className={inputClass}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-text">Phone Number *</label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+251 9XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Academic Info */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Academic & Address Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Entrance Result (0-500) *</label>
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="Enter your score"
                      min="0"
                      max="500"
                      value={formData.entranceResult}
                      onChange={(e) => setFormData({ ...formData, entranceResult: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Year Level *</label>
                    <select
                      className={inputClass}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value, department: "" })}
                    >
                      <option value="1">Year 1 (Freshman)</option>
                      <option value="2">Year 2</option>
                      <option value="3">Year 3</option>
                      <option value="4">Year 4</option>
                      <option value="5">Year 5+</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-text">
                      Department {parseInt(formData.year) >= 2 ? "*" : "(Optional for Year 1)"}
                    </label>
                    <select
                      className={inputClass}
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="">
                        {parseInt(formData.year) === 1 ? "To be selected later" : "Select your department"}
                      </option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    {parseInt(formData.year) === 1 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        As a freshman, department will be assigned after your first year
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-border pt-5 mt-5">
                  <h3 className="font-semibold text-foreground mb-4">Address</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Region *</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g., Oromia"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label-text">Zone *</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g., East Hararghe"
                        value={formData.zone}
                        onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label-text">Woreda *</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g., Haramaya"
                        value={formData.woreda}
                        onChange={(e) => setFormData({ ...formData, woreda: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label-text">Kebele *</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g., 01"
                        value={formData.kebele}
                        onChange={(e) => setFormData({ ...formData, kebele: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-ghost"
                >
                  ← Back
                </button>
              ) : (
                <Link to="/login" className="btn-ghost">
                  ← Back to Login
                </Link>
              )}

              {step < 3 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary disabled:opacity-50"
                >
                  {isLoading ? "Registering..." : "Complete Registration"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
