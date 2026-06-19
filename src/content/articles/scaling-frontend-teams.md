# Scaling Frontend Teams Without Slowing Down

When a frontend team grows from three engineers to a dozen, the bottleneck
shifts from *writing code* to *coordinating change*. The patterns that served
you at three people quietly become the things that slow you down at twelve.

> The job of a technical lead is to make the right thing the easy thing.

## The three forces that fight you

1. **Inconsistency** — every engineer reinvents buttons, modals, and spacing.
2. **Coupling** — a change in one feature mysteriously breaks another.
3. **Cognitive load** — nobody can hold the whole system in their head.

## A design system is leverage, not decoration

The single highest-leverage investment we made was a **design system** with
tokens at its core. It collapsed dozens of one-off components into a shared,
accessible vocabulary.

```tsx
// Tokens make theming a data problem, not a CSS problem.
const button = {
  paddingInline: tokens.space.md,
  borderRadius: tokens.radius.lg,
  background: tokens.color.primary,
}
```

## Make architecture boundaries explicit

We split the app into **features** that own their state and only talk to each
other through well-defined contracts. The rule was simple:

- A feature may import from `shared/`.
- A feature may **not** import from another feature.

That single constraint eliminated an entire class of "spooky action at a
distance" bugs.

## Measure what matters

| Metric | Before | After |
| --- | --- | --- |
| Lead time for a feature | 9 days | 5 days |
| Build time | 4 min | 70 s |
| Lighthouse performance | 62 | 94 |

Scaling a team is mostly about **removing reasons to coordinate**. Give people
clear boundaries, shared primitives, and fast feedback — then get out of the
way.
