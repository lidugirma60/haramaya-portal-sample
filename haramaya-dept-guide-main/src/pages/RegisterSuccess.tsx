import { Link, useLocation, Navigate } from "react-router-dom";

export default function RegisterSuccess() {
  const location = useLocation();
  const { studentId, year } = (location.state as { studentId?: string; year?: number }) || {};

  if (!studentId) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
          <svg
            className="w-10 h-10 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Registration Successful!
        </h1>
        <p className="text-muted-foreground mb-8">
          Welcome to Haramaya University. Your account has been created.
        </p>

        {/* Student ID Card */}
        <div className="card-elevated p-6 mb-6 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-2">Your Student ID</p>
          <p className="text-2xl font-mono font-bold text-primary">{studentId}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Please save this ID for future reference
          </p>
        </div>

        {/* Year-specific message */}
        {year === 1 ? (
          <div className="bg-accent/50 border border-border rounded-lg p-4 mb-6 text-left animate-fade-in">
            <p className="text-sm text-accent-foreground">
              <strong>📚 Freshman Year:</strong> You are registered as a First-Year student.
              You will take common freshman courses across all departments. Your specific
              department will be assigned after your first year based on your performance
              and preferences.
            </p>
          </div>
        ) : (
          <div className="bg-accent/50 border border-border rounded-lg p-4 mb-6 text-left animate-fade-in">
            <p className="text-sm text-accent-foreground">
              <strong>🎓 Year {year}:</strong> Your department has been assigned. You can
              now access your department-specific courses in the portal.
            </p>
          </div>
        )}

        {/* Login Button */}
        <Link to="/login" className="btn-primary inline-block w-full py-3">
          Proceed to Login →
        </Link>

        <p className="text-xs text-muted-foreground mt-6">
          Having trouble? Contact the registrar office at registrar@hu.edu.et
        </p>
      </div>
    </div>
  );
}
