When multiple teams ship into the same frontend, the bottleneck stops being code and becomes coordination. Everyone waits on the same release train; one team's bug blocks another team's feature. Micro‑frontends in a mono‑repo are how we gave teams deployment autonomy while still sharing a design language — and cut deployment cycles by about 30%.

This is not a recommendation to adopt micro‑frontends by default. They add real complexity. But for an organisation with several teams owning distinct product areas, they solve a problem that nothing else does.

## The problem they actually solve

Micro‑frontends are an **organisational** solution, not a technical one. Adopt them when:

- Multiple teams need to deploy **independently**, on their own cadence.
- Product areas have **clear ownership boundaries** (search, billing, dashboard).
- A single release pipeline has become a queue everyone waits in.

If you're one team on one product, you almost certainly don't need them — a well‑structured monolith will serve you better.

## Mono‑repo first, micro‑frontends second

It's tempting to split into many repos. Resist it early. A mono‑repo (we used Turborepo) gives you independent deployability **without** the pain of versioning shared packages across repos:

```
apps/
  shell/          # host: routing, layout, auth shell
  search/         # team-owned micro-frontend
  dashboard/      # team-owned micro-frontend
packages/
  ui/             # design system components
  config/         # shared eslint/tsconfig
  utils/          # shared helpers
```

The wins:

- **Atomic changes.** Update a shared component and every consumer in one PR — no publish‑then‑bump dance.
- **Cached, parallel builds.** Turborepo only rebuilds what changed, so CI stays fast as the repo grows.
- **One source of truth** for linting, TypeScript config, and the design system.

## Composition: keep the shell thin

The host ("shell") owns routing, the layout frame, and authentication. Each micro‑frontend is loaded on demand. With a modern bundler, route‑level dynamic imports get you most of the benefit with the least ceremony:

```tsx
const SearchApp = lazy(() => import('search/App'))
const DashboardApp = lazy(() => import('dashboard/App'))

<Routes>
  <Route path="/search/*" element={<SearchApp />} />
  <Route path="/dashboard/*" element={<DashboardApp />} />
</Routes>
```

Module Federation is the heavier option when you genuinely need **independent runtime deploys** (a team ships without rebuilding the shell). Reach for it only when the simpler approach stops meeting the need — the operational cost is real.

## The hard parts (and how to tame them)

- **Shared dependencies.** Two micro‑frontends bundling different React versions is a footgun. Pin core libraries (React, the router, the design system) as singletons.
- **Consistent UX.** Independent teams drift. The shared design‑system package is what keeps five teams' work looking like one product.
- **Cross‑app state.** Keep it minimal. Pass what's needed through the shell or the URL; avoid a giant global store that recouples everything you just decoupled.
- **Observability.** You need per‑app error tracking *and* a unified view, or a failure in one micro‑frontend becomes a mystery for the whole page.

## Why deployment cycles dropped ~30%

The number didn't come from the architecture diagram. It came from removing the queue:

- Teams merged and deployed their area **without** waiting on a shared release.
- Turborepo's caching meant CI only rebuilt affected apps, so pipelines stayed fast.
- Smaller, isolated deploys are lower‑risk, so they shipped more often with less ceremony.

## Takeaways

- Adopt micro‑frontends for an **organisational** problem (independent teams), not for novelty.
- Start with a **mono‑repo and route‑level splitting**; graduate to Module Federation only when you truly need independent runtime deploys.
- Invest early in the **shared design system, singleton dependencies, and observability** — that's what keeps autonomy from turning into chaos.

The goal is simple: let teams move fast on their own, while the product still feels like one coherent thing to the user.
