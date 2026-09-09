import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * NotificationBanner — the first real implementation of
 * `context/ui-registry.md`'s registered "Status / Notification Banner"
 * (previously "Planned", confirmed use only in the Forms success state).
 * This is its first non-`/register` usage — `/rules`' "Official
 * Guidelines May Be Updated" notice — which the registry entry already
 * anticipates ("other routes only once a concrete need exists").
 * Composition per spec: icon + short message on a semantic `-light`
 * background, `role="alert"` for error, `aria-live="polite"` otherwise.
 */
const VARIANT_CONFIG = {
  info: { icon: Info, container: "border-info bg-info-light", icon_: "text-info" },
  success: { icon: CheckCircle2, container: "border-success bg-success-light", icon_: "text-success" },
  warning: { icon: AlertTriangle, container: "border-warning bg-warning-light", icon_: "text-warning" },
  error: { icon: XCircle, container: "border-error bg-error-light", icon_: "text-error" },
} as const;

interface NotificationBannerProps {
  variant: keyof typeof VARIANT_CONFIG;
  eyebrow: string;
  heading: string;
  message: string;
  className?: string;
}

export function NotificationBanner({ variant, eyebrow, heading, message, className }: NotificationBannerProps) {
  const { icon: Icon, container, icon_ } = VARIANT_CONFIG[variant];

  return (
    <div
      role={variant === "error" ? "alert" : undefined}
      aria-live={variant === "error" ? undefined : "polite"}
      className={cn("flex flex-col gap-4 rounded-lg border p-6 sm:flex-row sm:items-start sm:gap-5", container, className)}
    >
      <span aria-hidden="true" className={cn("flex size-10 shrink-0 items-center justify-center rounded-full border-2", container, icon_)}>
        <Icon className="size-5" />
      </span>
      <div>
        <p className={cn("text-xs font-semibold tracking-[0.2em] uppercase", icon_)}>{eyebrow}</p>
        <h3 className="mt-1 font-display text-lg font-semibold text-text-primary">{heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{message}</p>
      </div>
    </div>
  );
}
