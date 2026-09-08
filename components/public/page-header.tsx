/**
 * PageHeader — context/ui-registry.md's standard non-hero page introduction.
 * Follows ui-rules.md's Page Headers section exactly: eyebrow (label
 * typography) + page heading (not hero-display) + one-to-two-sentence
 * supporting text, left-aligned, capped at content-column-narrow. This
 * component itself stays "quiet" (no gradient/glow/background of its own,
 * per that section's explicit instruction) even on pages that wrap it in a
 * PageBackdrop — the backdrop is the page's concern, not the header's.
 */
export function PageHeader({
  eyebrow,
  heading,
  supporting,
}: {
  eyebrow: string;
  heading: string;
  supporting?: string;
}) {
  return (
    <div className="max-w-content-narrow">
      <p className="font-body text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.15] font-semibold tracking-[-0.01em] text-text-primary">
        {heading}
      </h1>
      {supporting ? (
        <p className="mt-4 text-lg leading-[1.6] text-text-secondary">{supporting}</p>
      ) : null}
    </div>
  );
}
