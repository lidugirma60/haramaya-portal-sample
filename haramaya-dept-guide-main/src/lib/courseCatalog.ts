import type { Course } from "@/lib/data";
import { getDepartments, getFreshmanCourses } from "@/lib/data";

export type CatalogTrack = "freshman" | "department";

export interface CatalogCourseRow {
  course: Course;
  deptId: string;
  deptName: string;
  deptIcon: string;
  track: CatalogTrack;
  /** e.g. "Year 2" for department courses */
  yearLabel: string;
  semester: "sem1" | "sem2";
}

export function getCourseCatalogRows(): CatalogCourseRow[] {
  const rows: CatalogCourseRow[] = [];
  const fresh = getFreshmanCourses();

  for (const course of fresh.sem1) {
    rows.push({
      course,
      deptId: "FRESH",
      deptName: "Common freshman curriculum",
      deptIcon: "📘",
      track: "freshman",
      yearLabel: "Year 1",
      semester: "sem1",
    });
  }
  for (const course of fresh.sem2) {
    rows.push({
      course,
      deptId: "FRESH",
      deptName: "Common freshman curriculum",
      deptIcon: "📘",
      track: "freshman",
      yearLabel: "Year 1",
      semester: "sem2",
    });
  }

  const departments = getDepartments();
  for (const d of departments) {
    for (const [yearKey, sems] of Object.entries(d.courses)) {
      const yearNum = yearKey.replace("year", "");
      const yearLabel = `Year ${yearNum}`;
      for (const course of sems.sem1) {
        rows.push({
          course,
          deptId: d.id,
          deptName: d.name,
          deptIcon: d.icon,
          track: "department",
          yearLabel,
          semester: "sem1",
        });
      }
      for (const course of sems.sem2) {
        rows.push({
          course,
          deptId: d.id,
          deptName: d.name,
          deptIcon: d.icon,
          track: "department",
          yearLabel,
          semester: "sem2",
        });
      }
    }
  }

  return rows;
}
