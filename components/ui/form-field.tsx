import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * FormField — first real implementation of `context/ui-registry.md`'s
 * registered "Form Field" (previously "Planned", spec-only). Built to the
 * existing spec exactly: label (with a `text-secondary`, non-semantic
 * required asterisk) above the field, helper text below by default,
 * replaced by `error`-colored error text when `error` is set — per
 * `ui-rules.md`'s Forms section. This defines the visual shell only; it
 * doesn't render the input itself, so it stays agnostic to which
 * primitive (Input/Textarea/Select) a given field uses, matching this
 * component's registered "visual shell only, doesn't imply which fields
 * exist" framing.
 *
 * The caller wires `id`, `aria-invalid`, and `aria-describedby` onto the
 * actual input element itself (see `components/public/interest-form.tsx`
 * for the pattern) — kept explicit rather than injected via
 * `cloneElement`, so the connection between field and input stays
 * visible in the calling code rather than implicit.
 */
interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ id, label, required, error, helperText, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block font-body text-sm font-medium text-text-primary">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-text-secondary">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="font-body text-sm text-error">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="font-body text-sm text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
