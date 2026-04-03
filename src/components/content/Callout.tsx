import React, { type ReactNode } from "react";

type CalloutType = "info" | "warning" | "leader-takeaway" | "why-it-matters" | "story";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const configs: Record<CalloutType, { label: string; containerCls: string; iconCls: string; titleCls: string; icon: string }> = {
  info: {
    label: "Note",
    containerCls: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
    iconCls: "text-blue-500 dark:text-blue-400",
    titleCls: "text-blue-800 dark:text-blue-300",
    icon: "info",
  },
  warning: {
    label: "Warning",
    containerCls: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    iconCls: "text-amber-500 dark:text-amber-400",
    titleCls: "text-amber-800 dark:text-amber-300",
    icon: "warning",
  },
  "leader-takeaway": {
    label: "Leader Takeaway",
    containerCls: "border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30",
    iconCls: "text-violet-500 dark:text-violet-400",
    titleCls: "text-violet-800 dark:text-violet-300",
    icon: "star",
  },
  "why-it-matters": {
    label: "Why It Matters",
    containerCls: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
    iconCls: "text-emerald-500 dark:text-emerald-400",
    titleCls: "text-emerald-800 dark:text-emerald-300",
    icon: "zap",
  },
  story: {
    label: "Story",
    containerCls: "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/30",
    iconCls: "text-slate-500 dark:text-slate-400",
    titleCls: "text-slate-800 dark:text-slate-300",
    icon: "story",
  },
};

const icons: Record<string, ReactNode> = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  story: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const cfg = configs[type] ?? configs.info;
  const displayTitle = title ?? cfg.label;

  return (
    <aside className={`my-6 flex gap-4 rounded-xl border p-5 ${cfg.containerCls}`} role="note">
      <div className={`mt-0.5 shrink-0 ${cfg.iconCls}`} aria-hidden="true">
        {icons[cfg.icon]}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`mb-1 text-sm font-semibold ${cfg.titleCls}`}>{displayTitle}</p>
        <div className="prose prose-sm dark:prose-invert max-w-none text-inherit [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
