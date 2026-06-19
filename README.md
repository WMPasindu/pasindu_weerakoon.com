# Portfolio — Pasindu Weerakoon

A polished, animated personal portfolio for a Technical Lead & Software Engineer.
Built with **React + TypeScript + Ant Design**, smooth **Framer Motion**
animations, and a clean, content-driven architecture you can make your own by
editing a handful of data files.

## ✨ Features

- **Animated, accessible UI** — spring page transitions, scroll-reveal, a
  typewriter hero, magnetic CTAs, animated stat counters and skill bars. All
  motion honours `prefers-reduced-motion`.
- **Light / dark theme** — driven by Ant Design's `ConfigProvider`, persisted to
  `localStorage`, and respecting the OS preference on first load.
- **Projects** — filterable, animated grid with generated gradient covers.
- **Articles** — write posts in real Markdown (GFM, syntax highlighting); reading
  time is computed automatically.
- **Gallery** — masonry layout with a built-in lightbox; each image has a title
  and a short description.
- **Contact** — validated Ant Design form (wired to a `mailto:` draft by default).
- **Production-ready** — code-split routes, vendor chunking, SEO meta tags,
  strict TypeScript, ESLint + Prettier.

## 🧰 Tech stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | React 19 + Vite 8                        |
| Language       | TypeScript (strict)                      |
| UI library     | Ant Design v5 (+ React 19 patch)         |
| Animation      | Framer Motion                            |
| Routing        | React Router (data router, lazy routes)  |
| Content        | Markdown via `react-markdown` + `?raw`   |

## 🚀 Getting started

> **Node 20.19+ is required** (Vite 8). An `.nvmrc` is included — run `nvm use`.

```bash
nvm use            # selects Node 20
npm install
npm run dev        # start the dev server
```

Then open the URL Vite prints (default http://localhost:5173).

### Scripts

| Script                        | Description                          |
| ----------------------------- | ------------------------------------ |
| `npm run dev`                 | Start the dev server with HMR        |
| `npm run build`               | Type-check and build for production  |
| `npm run preview`             | Preview the production build         |
| `npm run lint`                | Lint with ESLint                     |
| `npm run format`              | Format with Prettier                 |
| `npm run typecheck`           | Type-check without emitting          |
| `npm run generate:placeholders` | Regenerate placeholder imagery     |

## 🗂️ Project structure

```
src/
├── components/
│   ├── animations/   # Reveal, Stagger, PageTransition, Magnetic, RotatingText
│   ├── common/       # Container, Section, SectionHeading, Cover, Logo, …
│   └── feature/      # Hero, ProjectCard, ArticleCard, SkillBar, Markdown, …
├── config/           # site.ts — name, nav, metadata
├── content/articles/ # Markdown post bodies
├── data/             # Typed content: profile, projects, articles, skills, …
├── hooks/            # useMediaQuery, useScrollProgress, useDocumentTitle, …
├── layout/           # Navbar, Footer, AppLayout, ScrollToTop, progress bar
├── pages/            # One component per route
├── router/           # Route table (lazy-loaded pages)
├── styles/           # global.css (design tokens) + markdown.css
└── theme/            # Ant Design tokens + light/dark ThemeProvider
```

## 🎨 Making it yours

Everything personal lives in plain data files — no component edits needed:

| Want to change…        | Edit…                                  |
| ---------------------- | -------------------------------------- |
| Name, bio, socials     | `src/data/profile.ts`                  |
| Site name & navigation | `src/config/site.ts`                   |
| Projects               | `src/data/projects.ts`                 |
| Skills & experience    | `src/data/skills.ts`, `experience.ts`  |
| Articles               | add a `.md` file + entry in `data/articles.ts` |
| Gallery images         | `src/data/gallery.ts` (+ your images in `public/`) |
| Brand colors / theme   | `src/theme/tokens.ts` + `src/styles/global.css` |

### Adding an article

1. Create `src/content/articles/my-post.md` (just the body — start with `# Title`).
2. Import it and add metadata in `src/data/articles.ts`:

   ```ts
   import myPost from '@/content/articles/my-post.md?raw'

   {
     slug: 'my-post',
     title: 'My Post',
     description: '…',
     date: '2026-06-01',
     tags: ['Frontend'],
     cover: 'linear-gradient(135deg, #6366f1, #22d3ee)',
     body: myPost,
   }
   ```

Reading time is derived automatically.

### Images

Placeholder gradient art is generated into `public/` by
`scripts/generate-placeholders.mjs`. Replace `public/avatar.svg` and the files in
`public/gallery/` with your own, then point `src/data/*` at them. Project and
article `cover` fields accept either an image URL **or** a CSS gradient string.

### Wiring up the contact form

By default the form opens a pre-filled email draft. To send through a backend
instead, replace the `onFinish` handler in `src/pages/ContactPage.tsx` with a
`fetch()` to your API or a service like Formspree / Resend.

## 📦 Deployment

This is a static SPA — build and host the `dist/` folder anywhere (Vercel,
Netlify, GitHub Pages, S3, …):

```bash
npm run build
```

For host-based SPA routing, add a rewrite so all paths serve `index.html`.
```
