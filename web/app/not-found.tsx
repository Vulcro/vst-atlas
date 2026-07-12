import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold">Plugin introuvable</h1>
      <p className="mt-4 text-muted">
        Cette page n&apos;existe pas ou le plugin a été retiré du catalogue.
      </p>
      <Link
        href="/plugins"
        className="mt-8 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-soft"
      >
        Retour au catalogue
      </Link>
    </div>
  );
}
