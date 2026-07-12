"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "vstatlas-cookie-consent";
const CONSENT_EVENT = "vstatlas-consent-change";

function getSnapshot(): boolean {
  return window.localStorage.getItem(STORAGE_KEY) !== "accepted";
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CONSENT_EVENT, handler);
  };
}

export function CookieBanner() {
  const showBanner = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function accept() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-black/40 sm:p-5">
      <p className="text-sm leading-relaxed text-muted">
        Nous utilisons des cookies pour la mesure d&apos;audience et la
        publicité (Google AdSense). En continuant, vous acceptez notre{" "}
        <Link href="/confidentialite" className="text-accent-soft underline">
          politique de confidentialité
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={accept}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-soft"
        >
          Accepter
        </button>
        <Link
          href="/confidentialite"
          className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
}
