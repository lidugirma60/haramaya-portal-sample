import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ACADEMIC_DATES, formatDisplayDate } from "@/lib/portalFeeds";
import { cn } from "@/lib/utils";

const categoryLabel: Record<(typeof ACADEMIC_DATES)[number]["category"], string> = {
  registration: "Registration",
  exam: "Exams",
  holiday: "Holiday",
  orientation: "Orientation",
  other: "Other",
};

const categoryStyle: Record<(typeof ACADEMIC_DATES)[number]["category"], string> = {
  registration: "bg-primary/10 text-primary border-primary/20",
  exam: "bg-accent text-accent-foreground border-primary/15",
  holiday: "bg-muted text-foreground border-border",
  orientation: "bg-success/10 text-success border-success/25",
  other: "bg-muted text-muted-foreground border-border",
};

export default function AcademicCalendar() {
  const sorted = [...ACADEMIC_DATES].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <PortalLayout title="Academic calendar">
      <div className="max-w-3xl space-y-6">
        <p className="text-muted-foreground text-sm">
          Sample key dates for planning. Confirm final dates with your department office and the
          registrar.
        </p>

        <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
          Need policy details? See{" "}
          <Link to="/announcements" className="text-primary font-medium hover:underline">
            announcements
          </Link>{" "}
          for registration windows and exam updates.
        </div>

        <ol className="relative border-l border-border ml-3 space-y-6 pl-6">
          {sorted.map((item, index) => (
            <li key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-background" />
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full border",
                    categoryStyle[item.category],
                  )}
                >
                  {categoryLabel[item.category]}
                </span>
                <time className="text-sm font-medium text-foreground" dateTime={item.date}>
                  {formatDisplayDate(item.date)}
                </time>
              </div>
              <p className="text-foreground">{item.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </PortalLayout>
  );
}
