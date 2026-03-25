"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const initial = stored ?? "dark";
    document.body.dataset.theme = initial;
    setTheme(initial);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-panel glow inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--text)]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
      {theme === "dark" ? "Light Cyber" : "Dark Cyber"}
    </button>
  );
}
