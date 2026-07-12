import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { CONTENT_SECTIONS } from "@/lib/categories";

const NAV_ITEMS = [
  { href: "/plugins", label: "Catalogue" },
  { href: "/gratuits", label: "Gratuits" },
  ...CONTENT_SECTIONS.map((section) => ({
    href: `/sections/${section.slug}`,
    label: section.title,
  })),
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-lg font-bold text-accent-soft ring-1 ring-accent/30">
            VA
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-wide">{SITE_NAME}</p>
            <p className="text-xs text-muted">Catalogue VST & MAO</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-muted xl:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/gratuits"
          className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-soft"
        >
          VST gratuits
        </Link>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-border/60 px-4 py-2 text-xs text-muted xl:hidden sm:px-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 hover:border-accent/40 hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
