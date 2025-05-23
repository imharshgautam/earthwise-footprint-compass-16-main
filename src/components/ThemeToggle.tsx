
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") === "dark"
      : false
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="p-2 rounded-lg bg-secondary/70 dark:bg-primary/40 transition hover:scale-105"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      type="button"
    >
      {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-800" />}
    </button>
  );
}
