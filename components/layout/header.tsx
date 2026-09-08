import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/challenges", label: "Challenges" },
  { href: "/timeline", label: "Timeline" },
  { href: "/prizes", label: "Prizes" },
  { href: "/rules", label: "Rules" },
  { href: "/faq", label: "FAQ" },
  { href: "/register", label: "Register" },
] as const;

/**
 * Temporary placeholder header — NOT the registered Site Header composed
 * component in context/ui-registry.md (no mobile drawer, active-nav-item
 * highlighting, or sticky behavior). Stands in only so pages have chrome to
 * render under while the real shared Header is built separately. Delete
 * this file and its import in app/layout.tsx once that lands.
 */
export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-(--breakpoint-lg) items-center justify-between gap-6 px-4 py-4 sm:px-8">
        <span className="font-display text-sm font-semibold tracking-wide text-text-primary">
          TECH4BHARAT 2026
        </span>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring rounded-sm font-body text-sm text-text-secondary hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
