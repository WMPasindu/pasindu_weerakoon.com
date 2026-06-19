/**
 * Generates abstract SVG placeholder imagery so the portfolio looks complete
 * with zero external assets. Replace the files in /public with real photos and
 * an avatar whenever you like — this script is purely a convenience.
 *
 *   node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const galleryDir = join(publicDir, 'gallery')
mkdirSync(galleryDir, { recursive: true })

// Warm espresso + terracotta pairs — cohesive, premium, never rainbow.
const palettes = [
  ['#3a2418', '#d65a31'],
  ['#5c3a23', '#e8924a'],
  ['#d65a31', '#3a2418'],
  ['#2a1a10', '#b8431f'],
  ['#8a4a25', '#e8924a'],
  ['#3a2418', '#d65a31'],
]

const rand = (seed) => {
  // Deterministic pseudo-random so output is stable between runs.
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function gallerySvg(index, [from, to]) {
  const w = 800
  const h = index % 3 === 0 ? 1000 : index % 3 === 1 ? 600 : 800
  let shapes = ''
  for (let i = 0; i < 6; i++) {
    const s = index * 10 + i
    const cx = Math.round(rand(s) * w)
    const cy = Math.round(rand(s + 1) * h)
    const r = Math.round(60 + rand(s + 2) * 180)
    const o = (0.08 + rand(s + 3) * 0.18).toFixed(2)
    shapes += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" opacity="${o}" />`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="22"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g filter="url(#blur)">${shapes}</g>
</svg>`
}

palettes.forEach((palette, i) => {
  writeFileSync(join(galleryDir, `shot-${i + 1}.svg`), gallerySvg(i, palette))
})

// A simple monogram avatar.
const avatar = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d65a31"/>
      <stop offset="1" stop-color="#8a4a25"/>
    </linearGradient>
  </defs>
  <rect width="240" height="240" rx="48" fill="url(#a)"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Inter, sans-serif" font-size="96" font-weight="700" fill="#fff">PW</text>
</svg>`
writeFileSync(join(publicDir, 'avatar.svg'), avatar)

console.log('Generated 6 gallery images + avatar in /public')
