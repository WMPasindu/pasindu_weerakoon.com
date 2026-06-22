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

const { render, routeMeta } = await import('./dist-server/entry-server.js')

const SITE = 'https://pasinduweerakoon.com'

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

console.log(`[prerender] done — ${ok}/${routeMeta.length} routes`)
