import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { ui, t } from "./i18n";

export default function EditorialFooter() {
  const { lang } = useLang();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Tokyo",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-line px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-editorial flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-serif text-2xl text-ink">Jason Ng</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-label text-ink-faint">
            {t(ui.footer.role, lang)}
          </div>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-label text-ink-faint">
          {time && <span>Osaka {time} JST</span>}
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
