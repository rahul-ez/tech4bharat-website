import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

/**
 * Button primitive — context/ui-registry.md's single interactive-action
 * element. Variants/states match context/ui-tokens.md's Buttons table and
 * context/ui-rules.md's Buttons section exactly; no fifth variant is added
 * speculatively.
 */
const buttonVariants = cva(
  "focus-ring relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 py-3 font-body text-[0.9375rem] font-semibold transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary:
          "border border-border bg-surface-secondary text-text-primary hover:bg-surface-tertiary active:border-border-light",
        ghost:
          "bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary active:bg-surface-tertiary",
        destructive:
          "bg-error text-error-foreground hover:bg-error-hover active:bg-error-active",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** No-op when `asChild` is true — a loading overlay can't be composed onto an arbitrary consumer element (e.g. a Link). */
  loading?: boolean
}

function Button({
  className,
  variant,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  if (asChild) {
    // Radix's Slot.Root requires exactly one element child to clone props
    // onto — no wrapper spans, no loading overlay here.
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant ?? "primary"}
        className={cn(buttonVariants({ variant, className }))}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  }

  const isDisabled = Boolean(disabled) || loading

  return (
    <button
      data-slot="button"
      data-variant={variant ?? "primary"}
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, className }))}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Spinner aria-hidden="true" />
        </span>
      )}
      <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  )
}

export { Button, buttonVariants }
