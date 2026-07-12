import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { CONTENT_SECTIONS } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-muted">
            Catalogue indépendant de plugins audio. Liens officiels uniquement —
            aucun contenu piraté.
          </p>
        </div>

        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Navigation</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/plugins" className="hover:text-foreground">
                Tous les plugins
              </Link>
            </li>
            <li>
              <Link href="/gratuits" className="hover:text-foreground">
                Plugins gratuits
              </Link>
            </li>
            {CONTENT_SECTIONS.map((section) => (
              <li key={section.slug}>
                <Link href={`/sections/${section.slug}`} className="hover:text-foreground">
                  {section.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/mentions-legales" className="hover:text-foreground">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-foreground">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Transparence</p>
          <p className="mt-3 leading-relaxed">
            Ce site peut afficher de la publicité (Google AdSense) et contient des
            liens affiliés vers Plugin Boutique, Thomann et les éditeurs officiels.
            Les commissions et revenus publicitaires financent la maintenance du
            catalogue.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} {SITE_NAME}. Tous les noms de plugins et
        marques appartiennent à leurs éditeurs respectifs.
      </div>
    </footer>
  );
}
