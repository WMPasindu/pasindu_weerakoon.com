# Animations That Respect Your Users

Motion is a feature. Done well, it guides attention, communicates state, and
makes an interface feel *alive*. Done poorly, it distracts — or worse, it makes
people feel sick.

## Animate the right properties

The browser can animate `transform` and `opacity` on the compositor thread
without triggering layout or paint. Everything else risks jank.

```css
/* Cheap — runs on the GPU */
.card { transition: transform 200ms ease, opacity 200ms ease; }

/* Expensive — forces layout on every frame */
.card { transition: top 200ms ease, height 200ms ease; }
```

## Spring, don't ease

Linear easing feels robotic. Spring physics feels natural because it mirrors
how objects move in the real world.

- Use **springs** for anything a user directly manipulates.
- Use **duration-based easing** for purely decorative entrances.

## Always honor `prefers-reduced-motion`

Some users experience real discomfort from large motion. Respecting their
preference is not optional — it is accessibility.

```tsx
const reduced = usePrefersReducedMotion()
const variants = reduced ? instant : springy
```

## Choreograph, don't overwhelm

A page where everything animates at once is chaos. **Stagger** entrances so the
eye is led through the content in sequence — typically 40–80ms between siblings.

Great motion is invisible. If users notice the animation instead of the
content, you have gone too far.
