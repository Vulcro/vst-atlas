import Link from "next/link";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { SITE_NAME } from "@/lib/constants";
import { CONTENT_SECTIONS } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-sm font-semibold">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-muted">
            Catalogue français de plugins VST et outils MAO. Liens officiels
            uniquement — aucun contenu piraté.
          </p>
        </div>

        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Catalogue</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/plugins" className="hover:text-foreground">
                Tous les plugins VST
              </Link>
            </li>
            <li>
              <Link href="/gratuits" className="hover:text-foreground">
                Plugins VST gratuits
              </Link>
            </li>
            <li>
              <Link href="/categorie/synth" className="hover:text-foreground">
                Synthés VST
              </Link>
            </li>
            <li>
              <Link href="/categorie/reverb" className="hover:text-foreground">
                Réverbs VST
              </Link>
            </li>
            <li>
              <Link href="/categorie/compressor" className="hover:text-foreground">
                Compresseurs VST
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm text-muted">
          <p className="font-medium text-foreground">Sections</p>
          <ul className="mt-3 space-y-2">
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
          <p className="font-medium text-foreground">Partenaire</p>
          <div className="mt-3">
            <AffiliateBanner variant="banner300" />
          </div>
          <p className="mt-4 leading-relaxed">
            Publicité AdSense et liens affiliés Plugin Boutique / Beatport. Les
            commissions financent le catalogue.
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
