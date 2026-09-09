import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * IconCard — a small icon + title + description composition built on the
 * Card primitive's `standard` variant, for grids of parallel categorical
 * items (e.g. `/rules`' six participation guidelines). The icon is always
 * functional labeling paired with a text title, never standing alone —
 * consistent with `ui-tokens.md`'s decorative-icons/illustrations
 * restriction, which this satisfies the same way Timeline's phase icons
 * do (DEC-006), not as a new exception.
 */
interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function IconCard({ icon: Icon, title, description, className }: IconCardProps) {
  return (
    <Card variant="standard" className={cn("flex flex-col gap-4", className)}>
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-lg border border-primary/30 bg-primary-muted text-primary"
      >
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
      </div>
    </Card>
  );
}
