import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, seedDataIfEmpty } from "@/lib/data";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    seedDataIfEmpty();
    if (getSession()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="gradient-hero">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                <span className="font-bold text-secondary-foreground">HU</span>
              </div>
              <span className="font-heading text-lg font-semibold text-primary-foreground">
                Haramaya University
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <ThemeToggle variant="hero" />
              <Link
                to="/login"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-secondary px-5 py-2"
              >
                Register
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center pb-20 pt-8">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground/80 px-4 py-2 rounded-full text-sm mb-6 animate-fade-in">
              <span>🎓</span>
              <span>Student Portal 2024/25</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Welcome to<br />
              <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                Haramaya University
              </span>
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Access your courses, departments, and academic resources all in one place.
              Register to begin your academic journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/register" className="btn-secondary px-8 py-3 text-lg">
                Get Started →
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 text-lg font-medium text-primary-foreground border border-primary-foreground/30 rounded-md hover:bg-primary-foreground/10 transition-colors"
              >
                Already Registered?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your complete academic portal for courses, departments, and student resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📚",
                title: "Course Management",
                description:
                  "View and plan your courses by semester. Access syllabi and track prerequisites.",
              },
              {
                icon: "🏛️",
                title: "Department Access",
                description:
                  "Browse all departments and access your specific curriculum based on your year level.",
              },
              {
                icon: "👤",
                title: "Student Profile",
                description:
                  "Manage your academic profile, track your progress, and update your information.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated p-6 text-center animate-fade-in"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center text-3xl">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1954", label: "Established" },
              { value: "50+", label: "Departments" },
              { value: "30K+", label: "Students" },
              { value: "2000+", label: "Faculty" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                <span className="font-bold text-secondary-foreground">HU</span>
              </div>
              <div>
                <p className="font-heading font-semibold">Haramaya University</p>
                <p className="text-sm text-background/60">Student Portal</p>
              </div>
            </div>
            <p className="text-sm text-background/60">
              © 2024 Haramaya University. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
