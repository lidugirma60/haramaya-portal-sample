import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { isDeptStarred, toggleStarredDept, PORTAL_PREFS_EVENT } from "@/lib/portalPrefs";
import { toast } from "sonner";

type DeptStarButtonProps = {
  deptId: string;
  className?: string;
  /** Larger hit target on dense cards */
  size?: "sm" | "md";
};

export function DeptStarButton({ deptId, className, size = "sm" }: DeptStarButtonProps) {
  const [starred, setStarred] = useState(() => isDeptStarred(deptId));

  useEffect(() => {
    setStarred(isDeptStarred(deptId));
  }, [deptId]);

  useEffect(() => {
    const sync = () => setStarred(isDeptStarred(deptId));
    window.addEventListener(PORTAL_PREFS_EVENT, sync);
    return () => window.removeEventListener(PORTAL_PREFS_EVENT, sync);
  }, [deptId]);

  const iconClass = size === "md" ? "h-5 w-5" : "h-4 w-4";
  const pad = size === "md" ? "p-2" : "p-1.5";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const now = toggleStarredDept(deptId);
        setStarred(now);
        toast.success(now ? "Added to starred" : "Removed from starred", {
          description: now ? "Find it quickly in the sidebar." : undefined,
        });
      }}
      className={cn(
        "rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        starred
          ? "text-secondary bg-secondary/15 hover:bg-secondary/25"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        pad,
        className,
      )}
      aria-pressed={starred}
      aria-label={starred ? "Remove from starred departments" : "Star department"}
    >
      <Star className={cn(iconClass, starred && "fill-current")} />
    </button>
  );
}
