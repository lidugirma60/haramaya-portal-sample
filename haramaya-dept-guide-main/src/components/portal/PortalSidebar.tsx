import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getDepartments, clearSession, getCurrentStudent, type Department } from "@/lib/data";
import { useState, useEffect } from "react";

interface PortalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PortalSidebar({ isOpen, onClose }: PortalSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const student = getCurrentStudent();

  useEffect(() => {
    setDepartments(getDepartments());
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Announcements", path: "/announcements", icon: "📣" },
    { label: "Academic calendar", path: "/calendar", icon: "🗓️" },
    { label: "My Profile", path: "/profile", icon: "👤" },
    { label: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-sidebar z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center text-xl font-bold text-sidebar-primary-foreground">
              HU
            </div>
            <div>
              <h1 className="font-heading text-lg font-semibold text-sidebar-foreground">
                Haramaya
              </h1>
              <p className="text-xs text-sidebar-foreground/70">Student Portal</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {/* Main Nav */}
          <div className="mb-6">
            <p className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-3">
              Menu
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      location.pathname === item.path
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <p className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-3">
              Departments
            </p>
            <ul className="space-y-1">
              {departments.map((dept) => (
                <li key={dept.id}>
                  <Link
                    to={`/department/${dept.id}`}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      location.pathname === `/department/${dept.id}`
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <span className="text-lg">{dept.icon}</span>
                    <span className="font-medium text-sm truncate">{dept.name}</span>
                    {student?.department === dept.id && (
                      <span className="ml-auto text-xs bg-sidebar-primary text-sidebar-primary-foreground px-1.5 py-0.5 rounded">
                        My Dept
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-sidebar-border">
          {student && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground font-semibold">
                {student.fullName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {student.fullName}
                </p>
                <p className="text-xs text-sidebar-foreground/60">Year {student.year}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sidebar-accent/50 text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200"
          >
            <span>🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
