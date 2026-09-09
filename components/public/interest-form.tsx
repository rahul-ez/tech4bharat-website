"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NotificationBanner } from "@/components/public/notification-banner";

/**
 * InterestForm — `/register`'s actual interactive element: a name+email
 * interest-capture form, per direct instruction. The full competition
 * registration workflow is unconfirmed (`tbd.md` — eligibility, team
 * rules, and the workflow itself are all "Not confirmed"), so this is
 * deliberately scoped to "let us notify you when registration opens,"
 * not a real registration submission — the ticket above this form is a
 * preview of what a confirmed pass will look like, not a claim that one
 * has been issued.
 *
 * `handleRegistrationSubmit` is the single, obvious handoff point for
 * whoever wires up the real backend (see its own doc comment). It is not
 * called `submitRegistration` — that name is already used by the actual
 * competition-registration server action on the backend integration
 * branch (`origin/sback`, `actions/register.ts`), which is a different,
 * larger, auth-gated flow (profile + team + duplicate-check) targeting a
 * `registrations` table. This form targets a separate, much smaller
 * `interest_signups` table — reusing the same name for a different
 * table/flow would be a real footgun for whoever wires this up next.
 */

interface InterestFormData {
  name: string;
  email: string;
}

/**
 * TODO: replace the body of this function with an actual Supabase insert
 * into `interest_signups` (name, email, timestamp) — see Satyendra
 * (backend/Supabase integration, `origin/sback`). Keep the signature and
 * the `Promise<{ success: boolean }>` return shape as-is so nothing in
 * `InterestForm` needs to change — return `{ success: false }` (or throw)
 * on failure and the existing error UI below already handles it.
 */
export async function handleRegistrationSubmit(data: InterestFormData): Promise<{ success: boolean }> {
  console.log("Interest registration submitted:", data);
  return { success: true };
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: InterestFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = "Enter your name.";
  }
  if (!data.email.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const cardRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function InterestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = { name, email };
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    try {
      const result = await handleRegistrationSubmit(data);
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div initial="hidden" animate="show" variants={cardRise}>
        <Card variant="standard" className="mx-auto max-w-content-narrow text-center">
          <CheckCircle2 aria-hidden="true" className="mx-auto size-8 text-success" />
          <h3 className="mt-4 font-display text-xl font-semibold text-text-primary">Interest submitted</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Thanks — we&apos;ll notify you as soon as registration officially opens.
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="show" variants={cardRise} className="mx-auto max-w-content-narrow">
      <Card variant="standard">
        <p className="font-body text-xs font-semibold tracking-[0.2em] text-primary uppercase">Register Your Interest</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">Get notified when it opens</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          This only registers your interest — it doesn&apos;t confirm a spot. Full
          competition registration opens once the workflow is confirmed by
          the organizers.
        </p>

        {status === "error" && (
          <div className="mt-6">
            <NotificationBanner
              variant="error"
              eyebrow="Submission failed"
              heading="Something went wrong"
              message="We couldn't submit your interest right now. Please try again in a moment."
            />
          </div>
        )}

        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <FormField id="interest-name" label="Name" required error={errors.name}>
            <Input
              id="interest-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "interest-name-error" : undefined}
              disabled={status === "submitting"}
            />
          </FormField>

          <FormField id="interest-email" label="Email" required error={errors.email}>
            <Input
              id="interest-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "interest-email-error" : undefined}
              disabled={status === "submitting"}
            />
          </FormField>

          <Button type="submit" variant="primary" loading={status === "submitting"} className="w-full sm:w-auto">
            Register Interest
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
