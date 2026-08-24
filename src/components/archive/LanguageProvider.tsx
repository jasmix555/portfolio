import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import type { Lang } from "./i18n";
import { patchUrl, readQuery } from "./urlState";

type LangState = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<LangState>({ lang: "en", setLang: () => {} });

export const useLang = () => useContext(LangContext);

/** The URL is untrusted input; `?lang=de` is not a locale this site has. */
const isLang = (v: string | null | undefined): v is Lang =>
  v === "en" || v === "jp";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  // Always "en" on the server + first client render to avoid hydration
  // mismatch; upgrade from the URL / storage / browser after mount.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // Order matters. A link that names a locale is a link to *that* locale —
    // it beats what this browser happens to remember, because the person who
    // sent it chose which version you should see.
    const fromUrl = readQuery().lang;
    const stored = localStorage.getItem("lang");
    setLangState(
      isLang(fromUrl)
        ? fromUrl
        : isLang(stored)
          ? stored
          : navigator.language?.toLowerCase().startsWith("ja")
            ? "jp"
            : "en"
    );
  }, []);

  /**
   * The locale is always spelled out in the URL, however it was decided, so
   * any address copied out of the bar is explicit about which version it is.
   *
   * Gated on `router.isReady`, not on mount: Next normalises the URL with its
   * own `replaceState` shortly *after* hydration, and anything stamped during
   * the mount effect gets wiped by it. Waiting for the router to settle is the
   * difference between this working and silently doing nothing.
   */
  useEffect(() => {
    if (!router.isReady) return;
    patchUrl({ lang });
  }, [router.isReady, lang]);

  // Back / forward: every history entry carries the locale it was made in.
  useEffect(() => {
    const onPop = () => {
      const fromUrl = readQuery().lang;
      if (isLang(fromUrl)) setLangState(fromUrl);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "jp" ? "ja" : "en";
  }, [lang]);

  // Writing the URL is the effect's job, not this one's — one writer, so a
  // toggle and a page load cannot disagree about what the address should say.
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem("lang", next);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
