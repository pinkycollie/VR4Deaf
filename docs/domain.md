# VR4Deaf Subdomain + Integration Architecture
# github.com/pinkycollie/vr4deaf → github.com/vr4deaf

## Subdomain Map

| Subdomain                        | Service                  | Runtime        | Notes                                    |
|----------------------------------|--------------------------|----------------|------------------------------------------|
| vr4deaf.org                      | Marketing/landing        | Deno Fresh     | Caddy + Cloudflare reverse proxy         |
| workspace.vr4deaf.org            | Taskade embed portal     | Deno Fresh     | Scoped PASETO token via /workspace/embed |
| api.vr4deaf.org                  | REST API v1              | Deno (port 8788) | OpenAPI 3.1 · all endpoints below      |
| auth.vr4deaf.org                 | DeafAuth gateway         | Rust (DeafAuth)| PASETO v4.public · Ed25519               |
| sync.vr4deaf.org                 | PinkSync WebSocket/SSE   | Deno           | Redis pub/sub · wss:// rooms             |
| agents.vr4deaf.org               | MagicianCore agent proxy | Deno → GCP     | Routes to Job/Business/Dev Magician pods |
| resources.vr4deaf.org            | Resource library         | Deno Fresh     | pgvector RAG via mbtq.dev MCP            |
| trust.vr4deaf.org                | FibonRose dashboard      | Deno Fresh     | Thirdweb blockchain · score viewer       |
| admin.vr4deaf.org                | SignOS admin panel       | Deno Fresh     | Owner/admin/developer roles only         |
| docs.vr4deaf.org                 | OpenAPI docs (Scalar)    | Static         | Scalar UI rendering openapi.yaml         |

## Upstream Integration (mbtq.dev → vr4deaf.org)

```
mbtq.dev (MCP server, port 8787)
  ├── DeafAuth (Rust, PASETO v4)
  │     auth.vr4deaf.org ←→ deafauth.mbtq.dev
  │     Endpoints: /auth/handshake, /auth/verify, /auth/refresh, /auth/revoke
  │
  ├── PinkSync (Deno, Redis pub/sub, AI broker)
  │     sync.vr4deaf.org ←→ pinksync.mbtq.dev
  │     WebSocket: wss://sync.vr4deaf.org/room/:id
  │     SSE: GET /sync/rooms/:id/events
  │     Brokers: Claude / Gemini / DeepSeek / Ollama
  │
  ├── FibonRose (Thirdweb blockchain, Fibonacci-weighted trust)
  │     trust.vr4deaf.org ←→ fibonrose.mbtq.dev
  │     Endpoints: /trust/:id, /trust/:id/event, /trust/leaderboard
  │     Max recipients: 144 · Tiers: 1,2,3,5,8,13,21,34,55,89,144
  │
  ├── MagicianCore (GCP Cloud Run, executive brain)
  │     agents.vr4deaf.org ←→ magiciancore.mbtq.dev
  │     Pods: JobMagician, BusinessMagician, DeveloperMagician
  │     Intent flow: vr4deaf → PinkSync normalize → MagicianCore → pod
  │
  └── Supabase pgvector RAG (5 namespaces)
        mbtq_docs · deaf_resources · creator_content
        vr4deaf_guides · fibonrose_policy
        Embedding: OpenAI text-embedding-3-small OR Ollama (sovereign)
```

## GitHub Repo Migration
# pinkycollie/vr4deaf → vr4deaf (org)

### Recommended org repo structure:
```
github.com/vr4deaf/
  ├── vr4deaf          # Main app (Deno Fresh, Layer 4 client)
  ├── api              # api.vr4deaf.org (OpenAPI + handlers)
  ├── workspace        # workspace.vr4deaf.org (Taskade embed)
  ├── infra            # Caddy config, Cloudflare rules, Hetzner deploy
  └── .github          # Shared CI/CD workflows, CODEOWNERS
```

### Migration steps:
1. Create `vr4deaf` GitHub org
2. Fork/transfer `pinkycollie/vr4deaf` → `vr4deaf/vr4deaf`
3. Update remote: `git remote set-url origin git@github.com:vr4deaf/vr4deaf.git`
4. Add 360-magicians as upstream dependency org
5. Set branch protection: main requires PR + PASETO-scoped CI check

## Caddy Config (vr4deaf.org)
```
vr4deaf.org {
  reverse_proxy localhost:8000
}
workspace.vr4deaf.org {
  reverse_proxy localhost:8001
}
api.vr4deaf.org {
  reverse_proxy localhost:8788
  header Access-Control-Allow-Origin "*"
}
auth.vr4deaf.org {
  reverse_proxy localhost:8789   # DeafAuth Rust service
}
sync.vr4deaf.org {
  reverse_proxy localhost:8790   # PinkSync Deno
}
docs.vr4deaf.org {
  root * /var/www/docs
  file_server
}
```

## service.json (MagicianCore manifest)
```json
{
  "service": "vr4deaf",
  "layer": 4,
  "type": "client_app",
  "upstream": "mbtq.dev",
  "auth": "deafauth",
  "realtime": "pinksync",
  "trust": "fibonrose",
  "agents": ["job_magician", "business_magician", "developer_magician"],
  "rag_namespaces": ["deaf_resources", "vr4deaf_guides"],
  "runtime": "deno",
  "port": 8000,
  "subdomains": [
    "vr4deaf.org",
    "workspace.vr4deaf.org",
    "api.vr4deaf.org",
    "auth.vr4deaf.org",
    "sync.vr4deaf.org",
    "trust.vr4deaf.org",
    "agents.vr4deaf.org",
    "resources.vr4deaf.org",
    "admin.vr4deaf.org",
    "docs.vr4deaf.org"
  ]
}
```