import { cn } from "@/lib/utils";

/**
 * VerticalAccentText — the stacked small-caps vertical word column,
 * originally built inline for Prize Display (`/prizes`, DEC-009) and
 * extracted here now that a second page (`/faq`) wants the same device.
 * Reuses the exact confirmed theme string from `project-overview.md`
 * ("Scalable Innovations for Next-Gen India" — already used verbatim in
 * Hero) split into its four words, rather than inventing new phrasing per
 * page — the same reasoning DEC-009 used when this was first built.
 * Purely decorative/atmospheric; `aria-hidden`.
 */
const THEME_WORDS = ["Scalable", "Innovations", "Next-Gen", "India"];

interface VerticalAccentTextProps {
  className?: string;
}

export function VerticalAccentText({ className }: VerticalAccentTextProps) {
  return (
    <div aria-hidden="true" className={cn("hidden shrink-0 flex-col items-center gap-6 lg:flex", className)}>
      {THEME_WORDS.map((word) => (
        <span
          key={word}
          className="font-body text-xs font-semibold tracking-[0.25em] text-text-muted uppercase [writing-mode:vertical-rl]"
        >
          {word}
        </span>
      ))}
    </div>
  );
}
