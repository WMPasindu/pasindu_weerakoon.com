/**
 * Hand-drawn doodle decorations scattered around the hero portrait — stars,
 * sparkles, a planet, hearts, swirls and a paper plane. Pure inline SVG line
 * art (stroke = currentColor) so it inherits the accent colour and stays crisp
 * at any size. Each doodle floats gently via CSS.
 */
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function Star() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <path
        {...stroke}
        d="M20 4 L24 15 L36 16 L27 24 L30 36 L20 29 L10 36 L13 24 L4 16 L16 15 Z"
      />
    </svg>
  )
}
function Sparkle() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <path {...stroke} d="M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3 Z" />
    </svg>
  )
}
function Planet() {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%">
      <circle {...stroke} cx="24" cy="24" r="11" />
      <ellipse {...stroke} cx="24" cy="24" rx="22" ry="7" transform="rotate(-20 24 24)" />
    </svg>
  )
}
function Heart() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <path
        {...stroke}
        d="M20 34 C8 26 4 18 8 12 C11 7 18 8 20 14 C22 8 29 7 32 12 C36 18 32 26 20 34 Z"
      />
    </svg>
  )
}
function Swirl() {
  return (
    <svg viewBox="0 0 48 40" width="100%" height="100%">
      <path
        {...stroke}
        d="M4 20 C10 6 26 6 30 18 C33 27 22 32 19 24 C17 19 24 16 26 21"
      />
    </svg>
  )
}
function ShootingStar() {
  return (
    <svg viewBox="0 0 56 44" width="100%" height="100%">
      <path {...stroke} d="M40 6 L43 14 L51 15 L45 21 L47 30 L40 25 L33 30 L35 21 L29 15 L37 14 Z" />
      <path {...stroke} d="M28 22 L6 38 M30 28 L12 40 M26 16 L8 26" />
    </svg>
  )
}
function Plane() {
  return (
    <svg viewBox="0 0 44 44" width="100%" height="100%">
      <path {...stroke} d="M40 6 L6 22 L20 26 L24 38 L40 6 Z M20 26 L40 6" />
    </svg>
  )
}
function Spiral() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <path
        {...stroke}
        d="M20 20 m-2 0 a2 2 0 1 1 4 1 a6 6 0 1 1 -10 -1 a10 10 0 1 1 17 7"
      />
    </svg>
  )
}

const doodles = [
  { Cmp: Sparkle, cls: 'd1', size: 38 },
  { Cmp: ShootingStar, cls: 'd2', size: 64 },
  { Cmp: Planet, cls: 'd3', size: 56 },
  { Cmp: Heart, cls: 'd4', size: 34 },
  { Cmp: Star, cls: 'd5', size: 40 },
  { Cmp: Swirl, cls: 'd6', size: 52 },
  { Cmp: Plane, cls: 'd7', size: 40 },
  { Cmp: Spiral, cls: 'd8', size: 36 },
  { Cmp: Star, cls: 'd9', size: 26 },
  { Cmp: Heart, cls: 'd10', size: 24 },
]

export function HeroDecor() {
  return (
    <div className="hero__decor" aria-hidden="true">
      {doodles.map(({ Cmp, cls, size }) => (
        <span key={cls} className={`hero__doodle ${cls}`} style={{ width: size, height: size }}>
          <Cmp />
        </span>
      ))}
    </div>
  )
}
