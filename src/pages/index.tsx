import Head from "next/head";
import {
  ArchiveNav,
  Contact,
  DotField,
  Hero,
  Ideas,
  Modal,
  Profile,
  Records,
  useArchiveRoute,
  useLang,
} from "@/components/archive";

// Update this if you move to a custom domain — used for canonical + OG URLs.
const SITE = "https://portfolio-v2-one-ecru.vercel.app";

const OG_LOCALE = { en: "en_US", jp: "ja_JP" } as const;

/**
 * The whole archive is one page. `/records/[slug]`, `/ideas/[slug]` and
 * `/timeline/[year]` render this same component with a modal open over it, so
 * a shared link server-renders the index behind the record rather than a
 * detached detail page.
 */
export default function Portfolio() {
  const { target, query, open, step, close, patchQuery } = useArchiveRoute();
  const { lang } = useLang();

  return (
    <>
      <Head>
        <title>Jason Ng — REC ARCHIVE</title>
        <meta
          name="description"
          content="Jason Ng — front-end / full-stack-leaning engineer based in Osaka, Japan. An engineering record archive: every project filed with its stack, its hours, and its postmortem."
        />
        <meta name="theme-color" content="#0B0B0B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Canonical follows the locale. hreflang only counts when each version
            is canonical to itself — point them all at `/` and the alternates
            below are declared and then ignored. */}
        <link rel="canonical" href={`${SITE}/?lang=${lang}`} />
        {/* `ja`, not `jp`: `jp` is the country code. `jp` is only ever this
            codebase’s internal shorthand for the locale. */}
        <link rel="alternate" hrefLang="en" href={`${SITE}/?lang=en`} />
        <link rel="alternate" hrefLang="ja" href={`${SITE}/?lang=jp`} />
        {/* Unparameterised: the version that picks itself from the visitor. */}
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jason Ng" />
        <meta property="og:url" content={`${SITE}/?lang=${lang}`} />
        <meta property="og:title" content="Jason Ng — REC ARCHIVE" />
        <meta
          property="og:description"
          content="Front-end / full-stack-leaning engineer in Osaka, Japan. Every record ships its postmortem."
        />
        <meta property="og:image" content={`${SITE}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={OG_LOCALE[lang]} />
        <meta
          property="og:locale:alternate"
          content={OG_LOCALE[lang === "en" ? "jp" : "en"]}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jason Ng — REC ARCHIVE" />
        <meta
          name="twitter:description"
          content="Front-end / full-stack-leaning engineer in Osaka, Japan."
        />
        <meta name="twitter:image" content={`${SITE}/og.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jason Ng",
              jobTitle: "Front-end Engineer",
              url: `${SITE}/`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Osaka",
                addressCountry: "JP",
              },
              knowsLanguage: ["en", "ja", "id", "zh"],
              sameAs: [
                "https://github.com/jasmix555",
                "https://www.linkedin.com/in/jason-ng-6bb43a29a/",
                "https://www.instagram.com/jason_ng555/",
                "https://www.wantedly.com/id/jason_ng555",
              ],
            }),
          }}
        />
      </Head>

      <DotField />
      <ArchiveNav />

      <main id="main">
        <Hero />
        <Records onOpen={open} query={query} onQuery={patchQuery} />
        <Ideas onOpen={open} />
        <Profile onOpen={open} />
      </main>

      <Contact />

      {target && (
        <Modal
          target={target}
          onClose={close}
          onStep={step}
          onOpen={open}
        />
      )}
    </>
  );
}
