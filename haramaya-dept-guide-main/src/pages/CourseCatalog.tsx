import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCourseCatalogRows, type CatalogCourseRow } from "@/lib/courseCatalog";
import { seedDataIfEmpty } from "@/lib/data";

type DeptFilter = "ALL" | "FRESH" | string;

export default function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState<DeptFilter>("ALL");
  const [semesterFilter, setSemesterFilter] = useState<"ALL" | "sem1" | "sem2">("ALL");

  useEffect(() => {
    seedDataIfEmpty();
  }, []);

  const allRows = useMemo(() => getCourseCatalogRows(), []);

  const deptOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of allRows) {
      map.set(r.deptId, r.deptName);
    }
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [allRows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allRows.filter((row) => {
      if (deptFilter !== "ALL" && row.deptId !== deptFilter) return false;
      if (semesterFilter !== "ALL" && row.semester !== semesterFilter) return false;
      if (!q) return true;
      const blob = [
        row.course.code,
        row.course.name,
        row.deptName,
        row.yearLabel,
        row.semester === "sem1" ? "semester 1" : "semester 2",
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [allRows, query, deptFilter, semesterFilter]);

  const totalCredits = useMemo(
    () => filtered.reduce((acc, r) => acc + r.course.credits, 0),
    [filtered],
  );

  return (
    <PortalLayout title="Course catalog">
      <div className="space-y-6 max-w-5xl">
        <p className="text-muted-foreground text-sm">
          Search every freshman common course and department curriculum in one place. Jump to a
          department for full context and prerequisites.
        </p>

        <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
          <div className="flex-1 space-y-1.5">
            <label htmlFor="catalog-search" className="label-text">
              Search
            </label>
            <Input
              id="catalog-search"
              placeholder="Course code, title, department…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-xl"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="space-y-1.5 min-w-[200px]">
              <span className="label-text">Department</span>
              <Select value={deptFilter} onValueChange={(v) => setDeptFilter(v as DeptFilter)}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All departments</SelectItem>
                  <SelectItem value="FRESH">Freshman (common)</SelectItem>
                  {deptOptions
                    .filter(([id]) => id !== "FRESH")
                    .map(([id, name]) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 min-w-[160px]">
              <span className="label-text">Semester</span>
              <Select
                value={semesterFilter}
                onValueChange={(v) => setSemesterFilter(v as "ALL" | "sem1" | "sem2")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Both semesters</SelectItem>
                  <SelectItem value="sem1">Semester 1</SelectItem>
                  <SelectItem value="sem2">Semester 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground border border-border rounded-lg px-4 py-3 bg-muted/30">
          <span>
            <strong className="text-foreground">{filtered.length}</strong> courses match
          </span>
          <span>
            Combined credits (this list):{" "}
            <strong className="text-foreground">{totalCredits}</strong>
          </span>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Code</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Cr</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Year</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Sem</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap"> </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <CatalogRow
                    key={`${row.deptId}-${row.course.code}-${row.yearLabel}-${row.semester}`}
                    row={row}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12 px-4">No courses match your filters.</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

function CatalogRow({ row }: { row: CatalogCourseRow }) {
  const deptLink = row.deptId === "FRESH" ? "/dashboard" : `/department/${row.deptId}`;
  const linkLabel = row.deptId === "FRESH" ? "Dashboard" : "Department";

  return (
    <tr className="border-t border-border hover:bg-muted/40 transition-colors">
      <td className="px-4 py-3 font-mono text-xs text-primary whitespace-nowrap">{row.course.code}</td>
      <td className="px-4 py-3 text-foreground max-w-[280px]">
        <span className="font-medium">{row.course.name}</span>
        {row.course.prereqs && row.course.prereqs.length > 0 && (
          <span className="block text-xs text-muted-foreground mt-0.5">
            Prereq: {row.course.prereqs.join(", ")}
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{row.course.credits}</td>
      <td className="px-4 py-3">
        <span className="mr-1.5" aria-hidden>
          {row.deptIcon}
        </span>
        <span className="text-foreground">{row.deptName}</span>
      </td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{row.yearLabel}</td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
        {row.semester === "sem1" ? "I" : "II"}
      </td>
      <td className="px-4 py-3 text-right whitespace-nowrap">
        <Link to={deptLink} className="text-primary font-medium hover:underline text-xs">
          {linkLabel}
        </Link>
      </td>
    </tr>
  );
}
