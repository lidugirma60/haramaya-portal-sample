import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStudents, setSession, getSession, seedDataIfEmpty } from "@/lib/data";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    seedDataIfEmpty();
    if (getSession()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const students = getStudents();
    const student = students.find(
      (s) =>
        (s.username.toLowerCase() === formData.identifier.toLowerCase() ||
          s.id.toLowerCase() === formData.identifier.toLowerCase()) &&
        s.password === formData.password
    );

    if (!student) {
      setErrors(["Invalid username/Student ID or password"]);
      setIsLoading(false);
      return;
    }

    setSession(student.id);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${student.fullName}`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
              <span className="text-2xl font-bold text-primary-foreground">HU</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access your student portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 animate-fade-in">
                {errors.map((error, i) => (
                  <p key={i} className="text-sm text-destructive">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <div>
              <label className="label-text">Username or Student ID</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your username or ID"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="label-text">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center mt-6 text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register here
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo:</strong> Register a new account to test the portal
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden lg:flex lg:flex-1 gradient-hero items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-lg">
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="font-heading text-4xl font-bold mb-4">
            Haramaya University
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Student Portal — Access your courses, departments, and academic resources
            all in one place.
          </p>
          <div className="flex justify-center gap-6 text-sm opacity-75">
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div>Departments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">30K+</div>
              <div>Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1954</div>
              <div>Established</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
