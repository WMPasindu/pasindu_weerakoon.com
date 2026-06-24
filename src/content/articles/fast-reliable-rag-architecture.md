Retrieval-Augmented Generation is easy to demo and hard to make fast. The moment a RAG product has to do real work — generate candidates, validate them, *and* check each one against a live external system — naive implementations crawl. On a recent system that turns a plain-language prompt into available, on-brand names, the first working version took 30–60 seconds per request. We brought it down to a few seconds without dropping quality. Here's the architecture and the optimisations that mattered.

## The shape of the problem

The pipeline has to do four expensive things per request:

1. **Retrieve** relevant context from a knowledge base.
2. **Generate** candidates with a language model.
3. **Validate** them against rules.
4. **Check availability** of each candidate against an external registry.

Each of these can dominate latency if you let it. The trick is knowing which costs are fixed, which are parallelisable, and which you can avoid entirely.

## Minimise LLM calls — they're the budget

On a CPU-bound, locally-hosted small model, a single generation call can cost seconds. So the first rule is: **call the model as few times as possible.**

- **Generate in one constrained call.** Instead of asking for names one at a time, ask for a batch in a single call that returns structured JSON. One round-trip produces many candidates.
- **Make validation deterministic.** Rule checks — length, banned terms, literalness, formatting — are plain code, not model calls. The model proposes; cheap deterministic logic disposes.
- **Run "explanation" out of band.** Anything nice-to-have (a rationale, a summary) happens in a *separate* call after the names are already returned, so it never blocks the response the user is waiting for.

Cutting the pipeline from "many small LLM calls" to "one generation call plus deterministic steps" was the single biggest win.

## Hybrid retrieval: relevant context, fast

Retrieval feeds the model better context so it generates fewer junk candidates (which means fewer expensive retries). We used **hybrid search** — dense vector similarity combined with BM25 keyword scoring — so results are strong on both meaning and exact terms. Embeddings are computed in-process with a small sentence-transformer, and the vector store returns the top matches in milliseconds. Better retrieval up front pays for itself downstream.

## The availability check is where latency hides

Checking each candidate against an external registry is the sneaky cost: it's I/O-bound, it's outside your control, and done naively (one lookup after another) it's brutal.

```python
# Slow: sequential, blocks on each network round-trip
for name in candidates:
    results.append(check_availability(name))  # 200–500ms each, serially

# Fast: fan out concurrently, gather once
results = await asyncio.gather(*(check_availability(n) for n in candidates))
```

Three things made availability checking cheap:

- **Concurrency.** Fire all lookups at once with async I/O and gather the results, so total time is roughly the *slowest* lookup, not the sum of all of them.
- **Caching.** Recently-checked names are cached with a short TTL, so repeated or popular queries skip the network entirely.
- **Early exit.** Once enough *available* candidates are confirmed, stop — there's no need to check the rest.

## Bounded retries instead of open-ended loops

When too few candidates survive validation and availability, the pipeline loops back to generate more — but with a hard cap (e.g., three attempts). A bounded retry keeps quality high on hard prompts without ever letting a single request run away with your latency budget.

## What actually moved the numbers

The speedup wasn't one change; it was removing waste at every stage:

- **One batched, constrained generation call** instead of many.
- **Deterministic validation** instead of model-based checks.
- **Concurrent, cached availability checks** instead of sequential ones.
- **Out-of-band explanations** so the critical path returns as soon as the names are ready.
- **Bounded retries** so worst-case latency stays predictable.

## Takeaways

- In RAG, **the LLM call is your scarcest resource** — design the whole pipeline to use it sparingly.
- **Push work to deterministic code** wherever a model isn't strictly needed; it's faster, cheaper and more testable.
- **Treat external I/O as a first-class latency source** — parallelise it, cache it, and exit early.
- **Separate "must return now" from "nice to have"** so the user-facing response is never held hostage by optional work.

Fast RAG isn't about a faster model. It's about doing less, doing it concurrently, and only paying for the model when you truly have to.
