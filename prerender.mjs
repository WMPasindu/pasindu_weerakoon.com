/**
 * Build-time prerender. After the client and SSR bundles are built, this
 * renders the single-page portfolio to static HTML with the correct <title>,
 * description, canonical and Open Graph tags baked in, and writes the sitemap.
 *
 * The browser still boots the SPA normally (createRoot), so this is purely an
 * SEO / AI-crawler / social-preview enhancement.
 */
import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

const { render, routeMeta } = await import('./dist-server/entry-server.js')

const SITE = 'https://pasinduweerakoon.com'

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function applyMeta(html, { path: routePath, title, description }) {
  const url = `${SITE}${routePath === '/' ? '/' : routePath}`
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`,
    )
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
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
}

for (const meta of routeMeta) {
  let appHtml = ''
  try {
    appHtml = await render(meta.path)
  } catch (err) {
    console.error(`[prerender] render failed for ${meta.path}:`, err?.message)
    process.exitCode = 1
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
  console.log(`[prerender] wrote ${path.relative(distDir, outPath)}`)
}

// ---- Sitemap (single page) --------------------------------------------
const today = new Date().toISOString().slice(0, 10)
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `  <url>\n    <loc>${SITE}/</loc>\n    <lastmod>${today}</lastmod>\n` +
  `    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
  `</urlset>\n`
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log('[prerender] wrote sitemap.xml')
console.log('[prerender] done')
