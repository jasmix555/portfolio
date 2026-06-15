# Jason Ng — Portfolio

A modern, dark-themed personal portfolio built with Next.js, TypeScript and
Tailwind CSS, featuring a scroll-reactive Three.js background.

Live sections: hero, about, tech stack, selected work (with a project modal),
and contact.

## Tech

- **Next.js** (pages router) + **TypeScript**
- **Tailwind CSS** for styling
- **Three.js** for the interactive background
- **framer-motion** + **react-intersection-observer** for motion / scroll reveals
- **react-icons** + **devicon** for logos

## Getting started

```bash
# 1. install dependencies (includes Tailwind toolchain)
npm install

# 2. run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> If you're setting this up fresh and Tailwind isn't installed yet:
> `npm install -D tailwindcss@^3 postcss autoprefixer`

### Build

```bash
npm run build && npm start
```

## Project structure

```
src/
  components/
    Background3D/   # Three.js particle + wireframe scroll background
    Navbar/         # sticky blurred nav + mobile menu
    Hero/           # landing hero
    About/          # bio + facts
    TechStack/      # grouped skills (data-driven)
    Works/          # project card grid + Modal
    Modal/          # project detail modal
    Contact/        # contact + socials
    Reveal/         # scroll-in animation wrapper
    Stoker/         # custom cursor
  data/
    works.ts        # project data (+ Work type)
    tech.ts         # tech-stack data
  pages/
    index.tsx       # page composition
    _app.tsx, _document.tsx
  styles/
    globals.css     # Tailwind directives + base theme
```

Each component lives in its own folder with an `index.ts` barrel, so imports
stay clean: `import Hero from "@/components/Hero"`.

## Customizing

- **Colors / fonts** — `tailwind.config.js` (`accent`, `accent-2`, `surface`, …).
- **3D background** — particle count and colors in
  `src/components/Background3D/Background3D.tsx`.
- **Projects** — edit `src/data/works.ts`. Thumbnails go in `public/works/`
  (e.g. `pokedex.png`, `gcal.png`); cards show a colored placeholder until added.
- **Tech stack** — edit `src/data/tech.ts` (icons use devicon class names).
