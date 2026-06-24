import { SiGithub } from "react-icons/si";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Reveal from "../Reveal";
import { useLang } from "./LanguageProvider";
import { t } from "./i18n";

type Pair = { en: string; jp: string };
type Repo = { label: string; href: string; live?: boolean };
type Milestone = { year: string; text: Pair; now?: boolean; repos?: Repo[] };

const GH = "https://github.com/jasmix555";

// Truthful milestones + the public repos / live builds from each period.
const milestones: Milestone[] = [
  {
    year: "2022",
    text: {
      en: "Started out — learning HTML, CSS, and the basics of JavaScript.",
      jp: "スタート地点。HTML・CSS、そして基礎的なJavaScriptを学び始める。",
    },
  },
  {
    year: "2023",
    text: {
      en: "Went deeper into JavaScript, then picked up React and moved on to Next.js with Firebase / Supabase by year's end. Led a team for the first time (SpaceLang) and won two HTML5 Award 2023 prizes.",
      jp: "JavaScriptを深掘りし、年末にかけてReact、そしてNext.js + Firebase / Supabaseへ。初めてチームのリードエンジニアを務め(SpaceLang)、HTML5作品アワード2023で2賞を受賞。",
    },
    repos: [
      { label: "space-lang", href: `${GH}/space-lang` },
      { label: "Oh_Matchly", href: `${GH}/Oh_Matchly` },
      { label: "attendance_checker", href: `${GH}/attendance_checker` },
    ],
  },
  {
    year: "2024",
    text: {
      en: "Went deeper full-stack — built Reminiscape, a geolocation memory app (later award-winning), and Tiny Taskers, mentoring juniors as team lead.",
      jp: "フルスタックを深掘り。位置情報メモリアプリReminiscape(のちに受賞)と、後輩を指導しながらリードとして進めたTiny Taskersを制作。",
    },
    repos: [
      { label: "reminiscape", href: `${GH}/reminiscape` },
      { label: "tiny_taskers", href: `${GH}/tiny_taskers` },
    ],
  },
  {
    year: "2025",
    text: {
      en: "Graduated, and joined Dentsu Promotion as a contractor — building corporate campaign and product sites from designer handoffs.",
      jp: "卒業し、電通プロモーションに業務委託として参画。デザイン入稿から企業のキャンペーン・製品サイトを制作。",
    },
    repos: [{ label: "pokedex", href: `${GH}/pokedex` }],
  },
  {
    year: "2026",
    now: true,
    text: {
      en: "Shipping client sites today — and looking for a product-company, full-stack-leaning front-end role where I can own features end-to-end.",
      jp: "現在もクライアントサイトを制作中。機能を一気通貫で担える、事業会社・フルスタック寄りのフロントエンド職を探しています。",
    },
    repos: [{ label: "gcal-app", href: `${GH}/gcal-app` }],
  },
];

export default function Timeline() {
  const { lang } = useLang();
  return (
    <div>
      <ol className="relative ml-1 border-l border-line">
        {milestones.map((m, i) => (
          <li key={m.year} className="relative pb-12 pl-8 last:pb-0">
            <span
              className={`absolute -left-[6px] top-1.5 h-3 w-3 rounded-full ring-4 ring-paper ${
                m.now ? "bg-clay" : "bg-ink/30"
              }`}
            />
            <Reveal delay={i * 80}>
              <div className="grid gap-x-10 gap-y-4 md:grid-cols-[1fr_minmax(0,240px)]">
                <div>
                  <div className="font-mono text-[12px] uppercase tracking-label text-clay">
                    {m.year}
                  </div>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                    {t(m.text, lang)}
                  </p>
                </div>

                {m.repos && (
                  <div className="flex flex-col gap-2 md:pt-7">
                    {m.repos.map((r) => (
                      <a
                        key={r.label}
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="group inline-flex items-center gap-2 font-mono text-[12px] text-ink-soft transition-colors hover:text-clay"
                      >
                        {r.live ? (
                          <FaArrowUpRightFromSquare className="text-[11px]" />
                        ) : (
                          <SiGithub className="text-[13px]" />
                        )}
                        <span className="border-b border-transparent group-hover:border-clay">
                          {r.label}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <a
        href={GH}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        className="group mt-2 inline-flex items-center gap-2 pl-8 font-mono text-[12px] uppercase tracking-label text-ink-soft transition-colors hover:text-clay"
      >
        <SiGithub className="text-[13px]" />
        {lang === "jp" ? "GitHubで全て見る" : "All repositories on GitHub"}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </div>
  );
}
