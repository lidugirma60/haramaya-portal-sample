const STARRED_KEY = "hu_starred_depts";
const RECENT_KEY = "hu_recent_depts";
const MAX_RECENT = 8;

export const PORTAL_PREFS_EVENT = "hu-portal-prefs";

function notifyPrefsChanged(): void {
  window.dispatchEvent(new Event(PORTAL_PREFS_EVENT));
}

export function getStarredDeptIds(): string[] {
  try {
    const raw = localStorage.getItem(STARRED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function setStarredDeptIds(ids: string[]): void {
  localStorage.setItem(STARRED_KEY, JSON.stringify(ids));
  notifyPrefsChanged();
}

export function isDeptStarred(deptId: string): boolean {
  return getStarredDeptIds().includes(deptId);
}

/** @returns new starred state */
export function toggleStarredDept(deptId: string): boolean {
  const ids = getStarredDeptIds().filter((id) => id !== deptId);
  const wasStarred = ids.length !== getStarredDeptIds().length;
  if (wasStarred) {
    setStarredDeptIds(ids);
    return false;
  }
  setStarredDeptIds([deptId, ...getStarredDeptIds()]);
  return true;
}

export function getRecentDeptIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function recordDepartmentVisit(deptId: string): void {
  const next = [deptId, ...getRecentDeptIds().filter((id) => id !== deptId)].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  notifyPrefsChanged();
}
