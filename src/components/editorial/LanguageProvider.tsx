import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { Lang } from "./i18n";

type LangState = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };

const LangContext = createContext<LangState>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export const useLang = () => useContext(LangContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always "en" on the server + first client render to avoid hydration
  // mismatch; upgrade from storage / browser language after mount.
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "jp") setLang(stored);
    else if (navigator.language?.toLowerCase().startsWith("ja")) setLang("jp");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "jp" ? "ja" : "en";
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggle = useCallback(
    () => setLang((l) => (l === "en" ? "jp" : "en")),
    []
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}
