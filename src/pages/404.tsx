import Head from "next/head";
import { ArchiveNav, ScrollField } from "@/components/archive";
import { useLang } from "@/components/archive/LanguageProvider";
import { bodyFace, headline, t, ui } from "@/components/archive/i18n";

/**
 * 02.9 — the only other page. Same ground, same two background layers, no
 * illustration: a record slip with nothing on it.
 */
export default function NotFiled() {
  const { lang } = useLang();
  const face = lang === "jp" ? "font-jp" : "font-mono";

  return (
    <>
      <Head>
        <title>404 — NOT FILED · Jason Ng</title>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#0B0B0B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ScrollField />
      <ArchiveNav />

      <main id="main" className="flex min-h-svh flex-col justify-between px-5 pb-10 pt-20 lg:px-24 lg:pb-14 lg:pt-[120px]">
        <div
          className={`mx-auto flex w-full max-w-content justify-between gap-6 text-label text-g6 ${face}`}
        >
          <span className="text-signal">{t(ui.notFound.label, lang)}</span>
          <span className="text-right">{t(ui.notFound.meta, lang)}</span>
        </div>

        <div className="mx-auto grid w-full max-w-content items-end gap-10 lg:grid-cols-[1fr_420px] lg:gap-20">
          <h1
            className={`whitespace-pre-line ${headline(
              lang,
              "text-[64px] leading-[0.86] lg:text-display-l lg:leading-[0.84]",
              "text-[36px] leading-[1.2] lg:text-[112px] lg:leading-[1.04]"
            )}`}
          >
            {t(ui.notFound.head, lang)}
          </h1>

          <div className="flex flex-col gap-5 border-t border-g5 pt-4">
            <p className={`max-w-prose text-g7 ${bodyFace(lang)}`}>
              {t(ui.notFound.body, lang)}
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/"
                className={`bg-signal px-4 py-3 text-label font-semibold tracking-btn text-ground transition-colors duration-flick ease-snap hover:bg-bone ${face}`}
              >
                {t(ui.notFound.toIndex, lang)}
              </a>
              <a
                href="/#records"
                className={`border border-g5 px-4 py-3 text-label tracking-btn text-bone transition-colors duration-flick ease-snap hover:border-bone hover:bg-bone hover:text-ground ${face}`}
              >
                {t(ui.notFound.toRecords, lang)}
              </a>
            </div>
          </div>
        </div>

        {/* The section terminator, with nothing on it — which is the page. */}
        <div
          aria-hidden
          className="mx-auto w-full max-w-content border-t-[3px] border-bone"
        />
      </main>
    </>
  );
}
