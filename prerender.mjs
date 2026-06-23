/**
 * Build-time prerender. After the client and SSR bundles are built, this
 * renders each static route to HTML and writes a per-route index.html with the
 * correct <title>, description, canonical and Open Graph tags baked in.
 *
 * The browser still boots the SPA normally (createRoot), so this is purely an
 * SEO/social-preview enhancement — if a prerendered file were ever wrong, the
 * client app still renders correctly on top of it.
 */
import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

const { render, routeMeta, articleMeta } = await import(
  './dist-server/entry-server.js'
)

const SITE = 'https://pasinduweerakoon.com'
const LINKEDIN = 'https://www.linkedin.com/in/pasindu-weerakoon'
const GITHUB = 'https://github.com/WMPasindu'

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function applyMeta(html, { path: routePath, title, description }) {
  const url = `${SITE}${routePath === '/' ? '/' : routePath}`
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`,
    )
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${esc(title)}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${esc(title)}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`,
    )
  return out
}

let ok = 0
for (const meta of routeMeta) {
  let appHtml = ''
  try {
    appHtml = await render(meta.path)
  } catch (err) {
    console.warn(`[prerender] content render failed for ${meta.path}:`, err?.message)
  }

  const page = applyMeta(template, meta).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  const outPath =
    meta.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, meta.path.replace(/^\//, ''), 'index.html')

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, page, 'utf-8')
  ok += 1
  console.log(`[prerender] wrote ${path.relative(distDir, outPath)}`)
}

// ---- Article pages: article-specific OG + BlogPosting authorship schema ----
for (const a of articleMeta) {
  const routePath = `/articles/${a.slug}`
  const url = `${SITE}${routePath}`
  const title = `${a.title} — Pasindu Weerakoon`

  let appHtml = ''
  try {
    appHtml = await render(routePath)
  } catch (err) {
    console.warn(`[prerender] render failed for ${routePath}:`, err?.message)
  }

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    image: `${SITE}/portrait.png`,
    keywords: a.tags.join(', '),
    mainEntityOfPage: url,
    author: {
      '@type': 'Person',
      name: 'Pasindu Weerakoon',
      url: `${SITE}/`,
      sameAs: [LINKEDIN, GITHUB],
    },
    publisher: { '@type': 'Person', name: 'Pasindu Weerakoon' },
  }

  const articleHead =
    `<meta property="article:published_time" content="${a.date}" />` +
    `<meta property="article:author" content="Pasindu Weerakoon" />` +
    a.tags.map((t) => `<meta property="article:tag" content="${esc(t)}" />`).join('') +
    `<script type="application/ld+json">${JSON.stringify(blogPosting)}</script>`

  let page = applyMeta(template, { path: routePath, title, description: a.description })
    // Articles are article-type, not profile.
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
      '<meta property="og:type" content="article" />',
    )
    // Inject article meta + schema just before </head>.
    .replace('</head>', `${articleHead}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outPath = path.join(distDir, 'articles', a.slug, 'index.html')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, page, 'utf-8')
  ok += 1
  console.log(`[prerender] wrote ${path.relative(distDir, outPath)}`)
}

// ---- Generate sitemap.xml (static routes + articles) ----
const sitemapUrls = [
  { loc: `${SITE}/`, priority: '1.0', changefreq: 'monthly' },
  { loc: `${SITE}/about`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${SITE}/projects`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${SITE}/articles`, priority: '0.7', changefreq: 'weekly' },
  { loc: `${SITE}/gallery`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${SITE}/contact`, priority: '0.6', changefreq: 'yearly' },
  ...articleMeta.map((a) => ({
    loc: `${SITE}/articles/${a.slug}`,
    priority: '0.7',
    changefreq: 'yearly',
    lastmod: a.date,
  })),
]
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapUrls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
        `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log(`[prerender] wrote sitemap.xml (${sitemapUrls.length} urls)`)

console.log(`[prerender] done — ${ok} pages`)
