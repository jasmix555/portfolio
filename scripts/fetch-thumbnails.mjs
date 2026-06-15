/**
 * Download each site's OGP (Open Graph) image into public/works/.
 * No browser needed — uses Node's built-in fetch (Node 18+).
 *
 * Run from the project root:
 *   node scripts/fetch-thumbnails.mjs
 *
 * For each URL it reads the page's <meta property="og:image"> (falling back to
 * twitter:image / link[rel=image_src]) and saves that image under the matching
 * filename in public/works/. Files are saved with the names the site already
 * references; browsers render them regardless of the original image format.
 */
import path from "path";
import fs from "fs/promises";

const outDir = path.resolve(process.cwd(), "public/works");

// filename in public/works  ->  live URL
const shots = [
  // Projects
  { file: "pokedex.png", url: "https://pokedex-orcin-two.vercel.app/" },
  { file: "gcal.png", url: "https://gcal-app-tawny.vercel.app/" },

  // Professional work
  { file: "secom-ohtani.png", url: "https://www.secom.co.jp/special/home-project/test/" },
  { file: "nissay-usj.png", url: "https://www.nissay.co.jp/enjoy/usj/" },
  { file: "momup-park.png", url: "https://mamamo-mannaka.jp/momup-park/" },
  { file: "kao-osolo.png", url: "https://www.kao.co.jp/merit/osolo/" },
  { file: "lucua-11th.png", url: "https://www.lucua.jp/11th-anniversary/" },
  { file: "lucua-nightmarket.png", url: "https://www.lucua.jp/2026nightmarket/" },
  { file: "rohto-eyecare.png", url: "https://jp.rohto.com/learn-more/eyecare/start/" },
  { file: "epson-poster.png", url: "https://www.epson.jp/products/largeprinter/poster-printing/" },
  { file: "blendy-mybottle.png", url: "https://agf.ajinomoto.co.jp/brand/blendy/mybottlestick/" },
  { file: "agf-cafetimegift.png", url: "https://agf.ajinomoto.co.jp/brand/gift/fugift/casualgift/cafetimegift/" },
  { file: "fujifilm-oshimoji.png", url: "https://www.fujifilm.com/fb/ja/solutions/wide-variety/multicopy/oshikatu" },
  { file: "fujifilm-oshimoji-maker.png", url: "https://www.fujifilm.com/fb/ja/solutions/wide-variety/multicopy/oshikatu/oshimojiprintmaker" },
  { file: "ienaka-ouen.png", url: "https://cpn-wv-cl0304.one-zero.jp/ienaka-ouen-20251001/" },
  { file: "naturemade-woman.png", url: "https://www.otsuka.co.jp/nmd/smvm_woman/" },
  { file: "naturemade-man.png", url: "https://www.otsuka.co.jp/nmd/smvm_man/" },
  { file: "dhc-lip.png", url: "https://top.dhc.co.jp/shop/skin/lipseries_moist_color/" },
];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  "Accept-Language": "ja-JP,ja;q=0.9,en;q=0.8",
};

function extractImage(html) {
  const patterns = [
    /<meta[^>]+(?:property|name)=["']og:image(?::secure_url|:url)?["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i,
    /<link[^>]+rel=["']image_src["'][^>]*href=["']([^"']+)["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m && m[1]) return m[1].replace(/&amp;/g, "&").trim();
  }
  return null;
}

async function run() {
  await fs.mkdir(outDir, { recursive: true });

  let ok = 0;
  const missing = [];

  for (const { file, url } of shots) {
    process.stdout.write(`→ ${file}\n`);
    try {
      const pageRes = await fetch(url, { headers, redirect: "follow" });
      const html = await pageRes.text();
      let img = extractImage(html);
      if (!img) {
        missing.push(file);
        process.stdout.write("  ✗ no og:image found\n");
        continue;
      }
      img = new URL(img, pageRes.url || url).href; // resolve relative paths

      const imgRes = await fetch(img, { headers });
      if (!imgRes.ok) throw new Error(`image responded ${imgRes.status}`);
      const buf = Buffer.from(await imgRes.arrayBuffer());
      await fs.writeFile(path.join(outDir, file), buf);
      ok += 1;
      process.stdout.write(`  ✓ saved from ${img}\n`);
    } catch (err) {
      missing.push(file);
      process.stdout.write(`  ✗ failed: ${err.message}\n`);
    }
  }

  process.stdout.write(`\nDone. ${ok}/${shots.length} thumbnails saved to public/works/\n`);
  if (missing.length) {
    process.stdout.write(
      `No OGP image for: ${missing.join(", ")} — capture these manually or screenshot them.\n`
    );
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
