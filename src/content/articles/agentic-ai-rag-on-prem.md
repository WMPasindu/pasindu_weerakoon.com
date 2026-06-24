Plenty of teams want the capability of a modern AI assistant but can't send their data to a third-party API — regulation, privacy, cost, or simply a policy that data stays inside the building. The good news: a capable agentic RAG system runs perfectly well on your own hardware. Here's a practical guide to configuring one for on-prem hosting, how access works over SSH, and how the pipeline fits together end to end.

## Why on-prem at all

On-prem (or your own private cloud) makes sense when:

- **Data can't leave your network** for compliance or privacy reasons.
- **Predictable cost** matters more than burst scale — owned hardware beats per-token billing for steady workloads.
- **Latency and control** matter — no external rate limits, no surprise model deprecations.

The trade-off is that *you* own operations: hosting the model, the vector store, security and deployment. That's the work this article is about.

## The moving parts

A self-contained agentic RAG stack is a handful of services, each in its own container:

- **A local model runtime** — e.g. Ollama serving a small language model (Gemma, Mistral or Qwen). This replaces the hosted LLM API.
- **A vector database** — e.g. Weaviate — for hybrid (dense + keyword) retrieval over your corpus.
- **The agent/orchestration service** — a LangGraph pipeline that coordinates retrieval, generation, validation and ranking.
- **An API gateway** in front, and a database for any persistence.

```yaml
# docker-compose.yml (sketch)
services:
  ollama:        # local LLM runtime
    image: ollama/ollama
    volumes: ['ollama:/root/.ollama']
  weaviate:      # hybrid vector search
    image: semitechnologies/weaviate
  agent-api:     # LangGraph orchestration + REST gateway
    build: ./api
    depends_on: [ollama, weaviate]
```

Keeping each concern in its own container means you can scale, restart or upgrade them independently.

## How access works: SSH, done right

Everything starts with getting onto the box securely. SSH is the standard, and the rules are simple but non-negotiable:

- **Key-based auth only.** Generate a keypair, install the public key on the server, and disable password login entirely.

```bash
ssh-keygen -t ed25519 -C "deploy@onprem"
ssh-copy-id deploy@server
# then in /etc/ssh/sshd_config: PasswordAuthentication no
```

- **A dedicated, non-root deploy user** with only the permissions it needs.
- **Don't expose internal services to the internet.** The model runtime, vector DB and database should listen on the private network only. To reach an internal dashboard from your laptop, use an **SSH tunnel** rather than opening a port:

```bash
# Forward local 8080 to the server's internal Weaviate, over the SSH connection
ssh -L 8080:localhost:8080 deploy@server
```

The tunnel means the service is never publicly reachable — your encrypted SSH session is the only door in.

## How the deployment pipeline works

You want shipping to be a boring, repeatable command — not a manual SSH-and-fiddle session. A simple, robust flow:

1. **Build** the agent-API image in CI and run the test suite.
2. **Push** the image to a registry the server can pull from (a private one for on-prem).
3. **Deploy** by connecting over SSH and rolling the stack to the new image.

```bash
# CI deploy step, in essence
ssh deploy@server '
  cd /opt/agentic-rag &&
  docker compose pull &&
  docker compose up -d --remove-orphans
'
```

Because the model and vector store hold state in volumes, only the stateless agent-API actually swaps — so deploys are fast and low-risk. Pull the model once (`ollama pull mistral`) and it's cached on disk for every future deploy.

## How the request pipeline works at runtime

Once it's running, a request flows through the orchestration graph entirely inside your network:

1. **Gateway** receives the prompt.
2. **Retrieval** queries the vector DB for relevant context (hybrid dense + BM25).
3. **Generation** calls the local model with that context.
4. **Validation/ranking** agents filter and score the output deterministically.
5. **Response** returns — no byte of which ever left the building.

## Operational must-haves

- **Health checks and auto-restart** (`restart: unless-stopped`) so a crashed service recovers on its own.
- **Resource limits** — local models are memory- and CPU-hungry; pin limits so one service can't starve the others.
- **Backups** of the vector store and database volumes.
- **Logs and metrics** shipped to a local stack so you can see latency and failures without external tooling.

## Takeaways

- On-prem agentic RAG is **a few containers** — a local model runtime, a vector DB, and an orchestration service — wired together on a private network.
- **SSH is the secure front door:** key-only auth, a non-root deploy user, internal services bound to the private network, and SSH tunnels instead of open ports.
- **Make deployment a single repeatable command** over SSH, with state in volumes so only the stateless service swaps.
- The payoff is real: a capable AI system where **your data never leaves your infrastructure** — with predictable cost and full control.
