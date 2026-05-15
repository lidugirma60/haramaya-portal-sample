export type AnnouncementPriority = "info" | "reminder" | "urgent";

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  body: string;
  postedAt: string;
  priority: AnnouncementPriority;
}

export interface AcademicDate {
  id: string;
  label: string;
  date: string;
  category: "registration" | "exam" | "holiday" | "orientation" | "other";
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-2026-01",
    title: "Course registration window opens",
    summary: "Plan your semester courses before slots fill.",
    body: "Online registration for the upcoming semester opens next week. Complete any holds on your account early, confirm prerequisites with your advisor, and save a draft schedule before you submit. Late registration may incur fees.",
    postedAt: "2026-05-10",
    priority: "urgent",
  },
  {
    id: "ann-2026-02",
    title: "Library hours extended for finals",
    summary: "Main campus library stays open until midnight during exam weeks.",
    body: "During the official examination period, the main library will operate with extended evening hours. Group study rooms can be booked from the portal; bring your student ID for after-hours entry.",
    postedAt: "2026-05-08",
    priority: "reminder",
  },
  {
    id: "ann-2026-03",
    title: "Welcome: updated department guides",
    summary: "Browse refreshed curriculum maps in each department section.",
    body: "Department pages now highlight year-level courses and prerequisites more clearly. First-year students should review the common freshman curriculum; continuing students can compare elective options across departments for planning.",
    postedAt: "2026-05-01",
    priority: "info",
  },
];

export const ACADEMIC_DATES: AcademicDate[] = [
  {
    id: "cal-1",
    label: "Add / drop period ends",
    date: "2026-05-22",
    category: "registration",
  },
  {
    id: "cal-2",
    label: "Mid-semester assessments",
    date: "2026-06-10",
    category: "exam",
  },
  {
    id: "cal-3",
    label: "Eid al-Adha — campus holiday",
    date: "2026-06-16",
    category: "holiday",
  },
  {
    id: "cal-4",
    label: "Final examinations begin",
    date: "2026-07-01",
    category: "exam",
  },
  {
    id: "cal-5",
    label: "New student orientation",
    date: "2026-09-05",
    category: "orientation",
  },
  {
    id: "cal-6",
    label: "Fall registration deadline",
    date: "2026-09-18",
    category: "registration",
  },
];

export function formatDisplayDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
