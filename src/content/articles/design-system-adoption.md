Most design systems don't fail because the components are bad. They fail because nobody uses them. Six months in, you find three "Button" implementations, a Figma library that's drifted from the code, and engineers copy‑pasting styles because the system was slower than just doing it themselves. Here's how to build one teams actually adopt — the kind that powered consistent UI across multiple web and mobile products.

## Adoption is the product

A design system's success metric isn't "number of components." It's **adoption rate**: what percentage of the UI is built from the system. Optimise for that from day one. A small set of components everyone uses beats a comprehensive library everyone ignores.

That reframing changes your priorities: developer experience, documentation, and migration tooling matter as much as the components themselves.

## Build on tokens, not hard‑coded values

Start with **design tokens** — the primitive decisions (colour, spacing, type, radius) expressed as variables. Components consume tokens; they never hard‑code values. This is what lets you theme, support dark mode, and rebrand without touching component code.

```css
:root {
  --color-primary: #15695e;
  --space-3: 16px;
  --radius-md: 12px;
}
.button {
  background: var(--color-primary);
  padding: var(--space-3);
  border-radius: var(--radius-md);
}
```

Tokens are also the contract with design. When a designer changes the primary colour, it's a token change — not a hunt through stylesheets.

## Make the right thing the easy thing

Engineers adopt a system when it's **faster** than rolling their own. That means:

- **A great default API.** Sensible props, good TypeScript types, autocomplete that documents itself.
- **Accessibility built in.** Focus states, keyboard support, and ARIA handled inside the component, so teams get WCAG compliance for free instead of as a chore.
- **Copy‑paste‑free usage.** One import, no setup ritual.

```tsx
// One import, accessible by default, themed by tokens.
import { Button } from '@acme/ui'

<Button variant="primary" onClick={save}>Save changes</Button>
```

If using the system is more typing than not using it, you've already lost.

## Documentation is part of the component

A component without docs doesn't exist — engineers can't find it, so they rebuild it. Treat documentation as a release requirement, not an afterthought. Live, interactive examples (Storybook or similar) where people can see props, states, and copy working code are worth more than any written spec.

## Version deliberately, communicate relentlessly

Breaking changes erode trust faster than anything. Protect adopters:

- **Semantic versioning**, with breaking changes batched and announced.
- **Deprecation warnings** in the console before removal, with the migration path in the message.
- **Codemods** for mechanical migrations so upgrading is a command, not a weekend.

## Govern as a partnership, not a gate

The fastest way to kill adoption is to make the design‑system team a bottleneck every change must queue behind. Instead:

- Provide a **contribution path** so product teams can add components back.
- Hold a lightweight review for consistency, not control.
- Treat the product teams as customers — their friction is your backlog.

## How you know it's working

- Adoption rate climbing toward your target (e.g., 80%+ of UI from the system).
- New screens assembled from existing components, not bespoke CSS.
- Accessibility and brand consistency arriving "for free" because they're baked into the primitives.
- A rebrand or dark‑mode launch shipping as a **token change**, not a rewrite.

## Takeaways

- **Measure adoption, not component count.** That's the real product.
- **Tokens first** — they're the foundation that makes theming and consistency possible.
- **Make the system the path of least resistance**, document it as you ship it, and version it kindly.
- **Govern as a partnership.** A design system is a product whose users are your own engineers; serve them and they'll carry consistency across every screen for you.
