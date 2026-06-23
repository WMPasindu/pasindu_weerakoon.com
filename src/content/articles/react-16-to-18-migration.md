Migrating a large, business‑critical React application from React 16 to React 18 sounds like a version bump. In practice, on a healthcare platform with hundreds of components and real users who can't tolerate downtime, it's a program of work. Here's the approach that let us ship the migration incrementally and come out with a ~25% improvement in performance metrics — without a big‑bang rewrite.

## Start with a safety net, not a codemod

Before touching a single dependency, invest in the things that tell you whether you broke something:

- **Smoke‑level end‑to‑end tests** on your top 10 user journeys (login, search, the critical workflow). These catch the regressions unit tests miss.
- **A performance baseline.** Capture Core Web Vitals (LCP, INP, CLS) and a few custom timings *before* you start, so "25% faster" is a measured fact, not a feeling.
- **Error monitoring** wired up so a spike after a deploy is obvious within minutes.

If you can't tell within an hour whether a release regressed, you'll migrate slowly and fearfully. Fix that first.

## Upgrade in the right order

React 18's headline feature — concurrent rendering — is opt‑in. The upgrade itself is mostly mechanical, and the order matters:

1. **Bump dependencies** and get the app compiling on React 18 while still using the legacy `ReactDOM.render`. Nothing concurrent is active yet.
2. **Fix the warnings.** Strict Mode in dev now double‑invokes effects to surface bugs. This is where you find effects that aren't idempotent.
3. **Switch to `createRoot`.** This is the line that actually turns on React 18.

```tsx
// Before
import ReactDOM from 'react-dom'
ReactDOM.render(<App />, document.getElementById('root'))

// After
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')!).render(<App />)
```

Do these as **separate, shippable pull requests**. If something breaks, you know exactly which step caused it.

## Automatic batching will surprise you

React 18 batches state updates everywhere — including inside promises, `setTimeout`, and native event handlers — not just React events. This is faster, but it changes timing assumptions some code quietly relied on:

```tsx
// In React 17 this re-rendered twice; in React 18 it re-renders once.
fetchData().then(() => {
  setLoading(false)
  setData(result)
})
```

99% of the time this is a free win. For the 1% that depended on the intermediate render, `flushSync` is the escape hatch — use it sparingly and document why.

## Layer Next.js in for the real performance gains

The version bump makes the app *correct* on React 18. The performance wins came from adopting Next.js capabilities deliberately:

- **Move data fetching to the server** for the heaviest routes so the browser receives HTML, not a spinner.
- **Code‑split aggressively** so each route ships only what it needs.
- **Stream** the slow parts of a page instead of blocking the whole render on the slowest query.

Migrate route by route. A hybrid app — some routes server‑rendered, some still client‑only — is a perfectly good intermediate state to live in for weeks.

## What actually moved the metric

The 25% improvement didn't come from one heroic change. It came from:

- Server‑rendering the landing and search routes (LCP).
- Cutting the main bundle by code‑splitting (TTI / INP).
- Removing layout shift from late‑loading content (CLS).

## Takeaways

- **Decouple "upgrade React" from "go faster."** They're two projects. The upgrade unblocks the speed work; it doesn't deliver it on its own.
- **Ship in small, reversible PRs** behind your safety net.
- **Measure before and after.** A migration you can't quantify is a migration you can't defend to stakeholders — or learn from.

Done this way, a scary version jump becomes a series of calm, boring deploys. Boring is exactly what you want when real people depend on the product.
