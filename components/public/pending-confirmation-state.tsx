import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * PendingConfirmationState — the first real implementation of
 * `context/ui-registry.md`'s registered "Pending Confirmation State"
 * component, previously "Planned" (spec-only, no code). Built exactly to
 * the spec already recorded there and in `ui-rules.md`'s "Pending /
 * Unconfirmed Content" section: a dashed `border-muted`/`surface-muted`
 * card (the Empty-State card pattern) holding a `warning` Badge reading
 * "Pending confirmation", a short neutral heading, and one plain sentence
 * of context — never invented example content standing in for the real
 * thing.
 */
interface PendingConfirmationStateProps {
  heading: string;
  message: string;
  className?: string;
}

export function PendingConfirmationState({ heading, message, className }: PendingConfirmationStateProps) {
  return (
    <Card
      variant="informational"
      className={cn("border-dashed border-muted bg-surface-muted p-8 text-center sm:p-12", className)}
    >
      <Badge variant="warning" className="mx-auto">
        Pending confirmation
      </Badge>
      <h3 className="mt-4 font-display text-2xl font-bold text-text-primary sm:text-3xl">{heading}</h3>
      <p className="mx-auto mt-3 max-w-xl text-text-secondary sm:text-lg">{message}</p>
    </Card>
  );
}
