import { PortalLayout } from "@/components/portal/PortalLayout";
import { ANNOUNCEMENTS, formatDisplayDate, type AnnouncementPriority } from "@/lib/portalFeeds";
import { cn } from "@/lib/utils";

function priorityStyles(p: AnnouncementPriority) {
  switch (p) {
    case "urgent":
      return "bg-destructive/15 text-destructive border-destructive/25";
    case "reminder":
      return "bg-secondary/30 text-secondary-foreground border-secondary/40";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function priorityLabel(p: AnnouncementPriority) {
  switch (p) {
    case "urgent":
      return "Urgent";
    case "reminder":
      return "Reminder";
    default:
      return "Info";
  }
}

export default function Announcements() {
  const sorted = [...ANNOUNCEMENTS].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
  );

  return (
    <PortalLayout title="Announcements">
      <div className="max-w-3xl space-y-6">
        <p className="text-muted-foreground text-sm">
          Official notices and reminders for students. Check back regularly during registration and
          exam periods.
        </p>

        <ul className="space-y-4">
          {sorted.map((a, index) => (
            <li
              key={a.id}
              className="card-elevated p-5 lg:p-6 animate-fade-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full border",
                    priorityStyles(a.priority),
                  )}
                >
                  {priorityLabel(a.priority)}
                </span>
                <time className="text-xs text-muted-foreground" dateTime={a.postedAt}>
                  {formatDisplayDate(a.postedAt)}
                </time>
              </div>
              <h2 className="font-heading text-lg font-semibold text-foreground">{a.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{a.summary}</p>
              <p className="text-sm text-foreground/90 mt-3 leading-relaxed">{a.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </PortalLayout>
  );
}
