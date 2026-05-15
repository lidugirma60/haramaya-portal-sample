import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { getDepartments } from "@/lib/data";
import { Search } from "lucide-react";

export function PortalQuickNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const runCommand = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const departments = getDepartments();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-muted/40 text-muted-foreground text-sm hover:bg-muted/70 transition-colors max-w-[220px] lg:max-w-xs"
        aria-label="Open quick navigation"
      >
        <Search className="h-4 w-4 shrink-0 opacity-70" />
        <span className="truncate">Search portal…</span>
        <kbd className="pointer-events-none ml-auto hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="sm:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Open search"
      >
        <Search className="h-5 w-5 text-muted-foreground" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search departments and pages…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem value="dashboard home" onSelect={() => runCommand("/dashboard")}>
              <span className="mr-2 text-base">🏠</span>
              Dashboard
            </CommandItem>
            <CommandItem value="announcements notices news" onSelect={() => runCommand("/announcements")}>
              <span className="mr-2 text-base">📣</span>
              Announcements
            </CommandItem>
            <CommandItem value="calendar dates academic schedule" onSelect={() => runCommand("/calendar")}>
              <span className="mr-2 text-base">🗓️</span>
              Academic calendar
            </CommandItem>
            <CommandItem value="profile account" onSelect={() => runCommand("/profile")}>
              <span className="mr-2 text-base">👤</span>
              My profile
            </CommandItem>
            <CommandItem value="settings preferences" onSelect={() => runCommand("/settings")}>
              <span className="mr-2 text-base">⚙️</span>
              Settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Departments">
            {departments.map((d) => (
              <CommandItem
                key={d.id}
                value={`${d.name} ${d.id} department courses`}
                onSelect={() => runCommand(`/department/${d.id}`)}
              >
                <span className="mr-2 text-base">{d.icon}</span>
                <span className="truncate">{d.name}</span>
                <span className="ml-2 text-xs text-muted-foreground shrink-0">{d.id}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
