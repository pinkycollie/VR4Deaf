/**
 * Supabase Management API Client
 * Covers: Postgres config, SQL, SSL, TypeScript types, environments/branches,
 *         organizations & members, projects (CRUD, metadata, upgrade, network),
 *         PostgREST config, API keys, secrets, pgsodium.
 *
 * Auth: Personal Access Token (PAT) or OAuth2 bearer token.
 * Base: https://api.supabase.com/v1
 */

// ─── Base types ───────────────────────────────────────────────────────────────

export interface SupabaseManagementClientOptions {
  accessToken: string;
  baseUrl?: string;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
}

// ─── Domain types ─────────────────────────────────────────────────────────────

// ── Postgres Config ──────────────────────────────────────────────────────────

export interface PostgresConfig {
  effective_cache_size?: string;
  logical_replication?: "on" | "off";
  maintenance_work_mem?: string;
  max_connections?: number;
  max_locks_per_transaction?: number;
  max_parallel_workers?: number;
  max_parallel_workers_per_gather?: number;
  max_replication_slots?: number;
  max_slot_wal_keep_size?: string;
  max_standby_archive_delay?: string;
  max_standby_streaming_delay?: string;
  max_wal_size?: string;
  max_wal_senders?: number;
  max_worker_processes?: number;
  session_replication_role?: "origin" | "replica" | "local";
  shared_buffers?: string;
  statement_timeout?: string;
  track_activity_query_size?: number;
  wal_keep_size?: string;
  work_mem?: string;
}

// ── SSL Enforcement ───────────────────────────────────────────────────────────

export interface SslEnforcementConfig {
  database?: {
    enforced: boolean;
  };
}

export interface SslEnforcementStatus {
  applied_successfully: boolean;
  current_config: {
    database: {
      enforced: boolean;
    };
  };
}

// ── SQL Snippets ──────────────────────────────────────────────────────────────

export interface SqlSnippet {
  id: string;
  name: string;
  description?: string;
  sql: string;
  visibility: "user" | "project" | "org";
  project_id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface QueryResult {
  rows: Record<string, unknown>[];
}

// ── TypeScript Types ──────────────────────────────────────────────────────────

export interface GenerateTypesResponse {
  types: string; // Raw TypeScript definitions
}

// ── Environments / Branches ───────────────────────────────────────────────────

export type BranchStatus =
  | "CREATING_PROJECT"
  | "RUNNING"
  | "FUNCTIONS_DEPLOYED"
  | "MIGRATIONS_PASSED"
  | "MIGRATIONS_FAILED"
  | "PAUSED"
  | "RESTORING"
  | "UNKNOWN";

export interface Branch {
  id: string;
  name: string;
  project_ref: string;
  parent_project_ref: string;
  is_default: boolean;
  persistent: boolean;
  status: BranchStatus;
  created_at: string;
  updated_at: string;
  git_branch?: string;
  pr_number?: number;
}

export interface BranchConfig {
  git_branch?: string;
  reset_on_push?: boolean;
}

export interface CreateBranchBody {
  branch_name: string;
  git_branch?: string;
  region?: string;
  desired_instance_size?: string;
}

export interface ActionRun {
  id: string;
  status: "running" | "success" | "failure" | "skipped";
  branch_id: string;
  created_at: string;
  updated_at: string;
}

// ── Organizations ─────────────────────────────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  billing_email?: string;
  created_at: string;
}

export interface OrganizationMember {
  user_id: string;
  username: string;
  primary_email: string;
  role_ids: number[];
  mfa_enabled: boolean;
  created_at: string;
}

export interface CreateOrganizationBody {
  name: string;
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type ProjectStatus =
  | "ACTIVE_HEALTHY"
  | "ACTIVE_UNHEALTHY"
  | "INACTIVE"
  | "COMING_UP"
  | "UNKNOWN"
  | "GOING_DOWN"
  | "INIT_FAILED"
  | "REMOVED"
  | "RESTORING"
  | "UPGRADING"
  | "PAUSING"
  | "PAUSED"
  | "PAUSE_FAILED";

export interface Project {
  id: string;
  ref: string;
  name: string;
  organization_id: string;
  cloud_provider: string;
  region: string;
  status: ProjectStatus;
  inserted_at: string;
  postgres_version?: string;
}

export interface CreateProjectBody {
  name: string;
  organization_id: string;
  db_pass: string;
  region: string;
  plan?: "free" | "pro" | "team" | "enterprise";
  desired_instance_size?: string;
  kps_enabled?: boolean;
}

export interface UpdateProjectBody {
  name?: string;
}

export interface ServiceHealth {
  name: string;
  healthy: boolean;
  status: string;
  error?: string;
}

export interface NetworkRestrictions {
  allowed_ipv4_cidrs: string[];
  allowed_ipv6_cidrs: string[];
  enforcement_state: "applied" | "unenforced";
}

export interface UpdateNetworkRestrictionsBody {
  dbAllowedCidrs: string[];
  dbAllowedCidrsV6?: string[];
}

export interface NetworkBan {
  ip_address: string;
  reason?: string;
  created_at: string;
}

export interface NetworkBanEnriched extends NetworkBan {
  country_code?: string;
  city?: string;
}

export interface PostgresUpgradeStatus {
  initiated_at?: string;
  status: "NOT_INITIATED" | "RUNNING" | "FAILED" | "COMPLETED";
  target_version?: string;
  error_message?: string;
}

export interface PostgresUpgradeEligibility {
  eligible: boolean;
  current_app_version: string;
  target_upgrade_versions: Array<{
    postgres_version: number;
    app_version: string;
    release_channel: string;
  }>;
  potential_breaking_changes: string[];
  data_path?: string;
  read_replicas_enabled?: boolean;
  pgbouncer_enabled?: boolean;
}

// ── PostgREST Config ──────────────────────────────────────────────────────────

export interface PostgRESTConfig {
  db_schema: string;
  db_extra_search_path: string;
  max_rows?: number;
  db_pool?: number;
  db_pool_acquisition_timeout?: number;
  db_pool_max_lifetime?: number;
  db_pool_max_idle_time?: number;
}

// ── API Keys & Secrets ────────────────────────────────────────────────────────

export interface ProjectApiKey {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  tags?: string[];
}

export interface ProjectApiKeyWithSecret extends ProjectApiKey {
  api_key: string; // Only returned on creation
}

export interface CreateApiKeyBody {
  description: string;
  type?: "anon" | "service_role";
}

export interface ProjectSecret {
  name: string;
  value: string;
}

export interface BulkCreateSecretsBody {
  secrets: ProjectSecret[];
}

// ── pgsodium ──────────────────────────────────────────────────────────────────

export interface PgsodiumConfig {
  root_key: string;
}

// ─── Client ───────────────────────────────────────────────────────────────────

export class SupabaseManagementClient {
  private readonly base: string;
  private readonly token: string;

  constructor({ accessToken, baseUrl = "https://api.supabase.com/v1" }: SupabaseManagementClientOptions) {
    this.token = accessToken;
    this.base = baseUrl;
  }

  // ── Core fetch ──────────────────────────────────────────────────────────────

  private async request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, query } = opts;

    let url = `${this.base}${path}`;
    if (query) {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined) params.set(k, String(v));
      }
      const qs = params.toString();
      if (qs) url += `?${qs}`;
    }

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new SupabaseManagementError(res.status, res.statusText, text, path);
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // POSTGRES CONFIG
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/config/database/postgres */
  getPostgresConfig(ref: string): Promise<PostgresConfig> {
    return this.request(`/projects/${ref}/config/database/postgres`);
  }

  /** PUT /v1/projects/{ref}/config/database/postgres */
  updatePostgresConfig(ref: string, config: Partial<PostgresConfig>): Promise<PostgresConfig> {
    return this.request(`/projects/${ref}/config/database/postgres`, {
      method: "PUT",
      body: config,
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SSL ENFORCEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/ssl-enforcement */
  getSslEnforcement(ref: string): Promise<SslEnforcementStatus> {
    return this.request(`/projects/${ref}/ssl-enforcement`);
  }

  /** PUT /v1/projects/{ref}/ssl-enforcement */
  updateSslEnforcement(ref: string, config: SslEnforcementConfig): Promise<SslEnforcementStatus> {
    return this.request(`/projects/${ref}/ssl-enforcement`, {
      method: "PUT",
      body: config,
    });
  }

  /** Enable SSL enforcement (shorthand) */
  enforceSSL(ref: string): Promise<SslEnforcementStatus> {
    return this.updateSslEnforcement(ref, { database: { enforced: true } });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SQL SNIPPETS & QUERIES
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/snippets */
  listSnippets(ref: string): Promise<SqlSnippet[]> {
    return this.request(`/projects/${ref}/snippets`);
  }

  /** GET /v1/projects/{ref}/snippets/{id} */
  getSnippet(ref: string, id: string): Promise<SqlSnippet> {
    return this.request(`/projects/${ref}/snippets/${id}`);
  }

  /** POST /v1/projects/{ref}/database/query — read/write SQL */
  runQuery(ref: string, query: string): Promise<QueryResult> {
    return this.request(`/projects/${ref}/database/query`, {
      method: "POST",
      body: { query },
    });
  }

  /** GET /v1/projects/{ref}/database/query — read-only SQL */
  readOnlyQuery(ref: string, query: string): Promise<QueryResult> {
    return this.request(`/projects/${ref}/database/query`, {
      method: "GET",
      query: { query },
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TYPESCRIPT TYPES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * GET /v1/projects/{ref}/types/typescript
   * Returns raw TypeScript type definitions for the project schema.
   */
  generateTypescriptTypes(
    ref: string,
    opts: { included_schemas?: string; exclude_schemas?: string } = {}
  ): Promise<GenerateTypesResponse> {
    return this.request(`/projects/${ref}/types/typescript`, {
      query: opts as Record<string, string>,
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ENVIRONMENTS / BRANCHES
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/branches */
  listBranches(ref: string): Promise<Branch[]> {
    return this.request(`/projects/${ref}/branches`);
  }

  /** GET /v1/branches/{branch_id} */
  getBranch(branchId: string): Promise<Branch> {
    return this.request(`/branches/${branchId}`);
  }

  /** POST /v1/projects/{ref}/branches */
  createBranch(ref: string, body: CreateBranchBody): Promise<Branch> {
    return this.request(`/projects/${ref}/branches`, { method: "POST", body });
  }

  /** DELETE /v1/branches/{branch_id} */
  deleteBranch(branchId: string): Promise<void> {
    return this.request(`/branches/${branchId}`, { method: "DELETE" });
  }

  /** GET /v1/branches/{branch_id}/config */
  getBranchConfig(branchId: string): Promise<BranchConfig> {
    return this.request(`/branches/${branchId}/config`);
  }

  /** PATCH /v1/branches/{branch_id}/config */
  updateBranchConfig(branchId: string, config: BranchConfig): Promise<BranchConfig> {
    return this.request(`/branches/${branchId}/config`, { method: "PATCH", body: config });
  }

  /** POST /v1/branches/{branch_id}/merge */
  mergeBranch(branchId: string): Promise<{ message: string }> {
    return this.request(`/branches/${branchId}/merge`, { method: "POST" });
  }

  /** POST /v1/branches/{branch_id}/reset */
  resetBranch(branchId: string, body?: { migration_version?: string }): Promise<{ message: string }> {
    return this.request(`/branches/${branchId}/reset`, { method: "POST", body });
  }

  /** GET /v1/branches/{branch_id}/actions/runs */
  listActionRuns(branchId: string): Promise<ActionRun[]> {
    return this.request(`/branches/${branchId}/actions/runs`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ORGANIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/organizations */
  listOrganizations(): Promise<Organization[]> {
    return this.request(`/organizations`);
  }

  /** GET /v1/organizations/{slug} */
  getOrganization(slug: string): Promise<Organization> {
    return this.request(`/organizations/${slug}`);
  }

  /** POST /v1/organizations */
  createOrganization(body: CreateOrganizationBody): Promise<Organization> {
    return this.request(`/organizations`, { method: "POST", body });
  }

  /** GET /v1/organizations/{slug}/members */
  listOrganizationMembers(slug: string): Promise<OrganizationMember[]> {
    return this.request(`/organizations/${slug}/members`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROJECTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects */
  listProjects(): Promise<Project[]> {
    return this.request(`/projects`);
  }

  /** GET /v1/projects/{ref} */
  getProject(ref: string): Promise<Project> {
    return this.request(`/projects/${ref}`);
  }

  /** POST /v1/projects */
  createProject(body: CreateProjectBody): Promise<Project> {
    return this.request(`/projects`, { method: "POST", body });
  }

  /** PATCH /v1/projects/{ref} */
  updateProject(ref: string, body: UpdateProjectBody): Promise<Project> {
    return this.request(`/projects/${ref}`, { method: "PATCH", body });
  }

  /** DELETE /v1/projects/{ref} */
  deleteProject(ref: string): Promise<void> {
    return this.request(`/projects/${ref}`, { method: "DELETE" });
  }

  /** POST /v1/projects/{ref}/pause */
  pauseProject(ref: string): Promise<Project> {
    return this.request(`/projects/${ref}/pause`, { method: "POST" });
  }

  /** POST /v1/projects/{ref}/restore */
  restoreProject(ref: string): Promise<Project> {
    return this.request(`/projects/${ref}/restore`, { method: "POST" });
  }

  /** GET /v1/projects/{ref}/health */
  getServicesHealth(ref: string): Promise<ServiceHealth[]> {
    return this.request(`/projects/${ref}/health`);
  }

  /** Poll until all services are ACTIVE_HEALTHY or timeout */
  async waitForHealthy(
    ref: string,
    opts: { timeoutMs?: number; intervalMs?: number } = {}
  ): Promise<void> {
    const { timeoutMs = 120_000, intervalMs = 3_000 } = opts;
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const health = await this.getServicesHealth(ref);
      const allHealthy = health.every((s) => s.healthy);
      if (allHealthy) return;
      await sleep(intervalMs);
    }
    throw new Error(`Project ${ref} did not become healthy within ${timeoutMs}ms`);
  }

  // ── Postgres Upgrade ───────────────────────────────────────────────────────

  /** GET /v1/projects/{ref}/upgrade/eligibility */
  getUpgradeEligibility(ref: string): Promise<PostgresUpgradeEligibility> {
    return this.request(`/projects/${ref}/upgrade/eligibility`);
  }

  /** GET /v1/projects/{ref}/upgrade/status */
  getUpgradeStatus(ref: string): Promise<PostgresUpgradeStatus> {
    return this.request(`/projects/${ref}/upgrade/status`);
  }

  /** POST /v1/projects/{ref}/upgrade */
  upgradePostgres(ref: string, body: { target_version: number }): Promise<{ message: string }> {
    return this.request(`/projects/${ref}/upgrade`, { method: "POST", body });
  }

  // ── Network Restrictions ───────────────────────────────────────────────────

  /** GET /v1/projects/{ref}/network-restrictions */
  getNetworkRestrictions(ref: string): Promise<NetworkRestrictions> {
    return this.request(`/projects/${ref}/network-restrictions`);
  }

  /** PUT /v1/projects/{ref}/network-restrictions */
  updateNetworkRestrictions(
    ref: string,
    body: UpdateNetworkRestrictionsBody
  ): Promise<NetworkRestrictions> {
    return this.request(`/projects/${ref}/network-restrictions`, { method: "PUT", body });
  }

  /** PATCH /v1/projects/{ref}/network-restrictions */
  patchNetworkRestrictions(
    ref: string,
    body: Partial<UpdateNetworkRestrictionsBody>
  ): Promise<NetworkRestrictions> {
    return this.request(`/projects/${ref}/network-restrictions`, { method: "PATCH", body });
  }

  // ── Network Bans ──────────────────────────────────────────────────────────

  /** GET /v1/projects/{ref}/network-bans */
  listNetworkBans(ref: string): Promise<NetworkBan[]> {
    return this.request(`/projects/${ref}/network-bans`);
  }

  /** GET /v1/projects/{ref}/network-bans/enriched */
  listNetworkBansEnriched(ref: string): Promise<NetworkBanEnriched[]> {
    return this.request(`/projects/${ref}/network-bans/enriched`);
  }

  /** DELETE /v1/projects/{ref}/network-bans — remove specific IPs from ban list */
  deleteNetworkBans(ref: string, ipAddresses: string[]): Promise<void> {
    return this.request(`/projects/${ref}/network-bans`, {
      method: "DELETE",
      body: { ipAddresses },
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // POSTGREST CONFIG
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/config/postgrest */
  getPostgRESTConfig(ref: string): Promise<PostgRESTConfig> {
    return this.request(`/projects/${ref}/config/postgrest`);
  }

  /** PATCH /v1/projects/{ref}/config/postgrest */
  updatePostgRESTConfig(ref: string, config: Partial<PostgRESTConfig>): Promise<PostgRESTConfig> {
    return this.request(`/projects/${ref}/config/postgrest`, { method: "PATCH", body: config });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // API KEYS
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/api-keys */
  listApiKeys(ref: string): Promise<ProjectApiKey[]> {
    return this.request(`/projects/${ref}/api-keys`);
  }

  /** GET /v1/projects/{ref}/api-keys/{id} */
  getApiKey(ref: string, id: string): Promise<ProjectApiKey> {
    return this.request(`/projects/${ref}/api-keys/${id}`);
  }

  /** POST /v1/projects/{ref}/api-keys */
  createApiKey(ref: string, body: CreateApiKeyBody): Promise<ProjectApiKeyWithSecret> {
    return this.request(`/projects/${ref}/api-keys`, { method: "POST", body });
  }

  /** DELETE /v1/projects/{ref}/api-keys/{id} */
  deleteApiKey(ref: string, id: string): Promise<void> {
    return this.request(`/projects/${ref}/api-keys/${id}`, { method: "DELETE" });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECRETS (Edge Function env secrets)
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/secrets */
  listSecrets(ref: string): Promise<Array<{ name: string }>> {
    return this.request(`/projects/${ref}/secrets`);
  }

  /**
   * POST /v1/projects/{ref}/secrets — upsert secrets in bulk.
   * Values are encrypted at rest via pgsodium.
   */
  bulkUpsertSecrets(ref: string, secrets: ProjectSecret[]): Promise<void> {
    return this.request(`/projects/${ref}/secrets`, {
      method: "POST",
      body: secrets,
    });
  }

  /** DELETE /v1/projects/{ref}/secrets — delete secrets by name */
  bulkDeleteSecrets(ref: string, secretNames: string[]): Promise<void> {
    return this.request(`/projects/${ref}/secrets`, {
      method: "DELETE",
      body: secretNames,
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PGSODIUM
  // ═══════════════════════════════════════════════════════════════════════════

  /** GET /v1/projects/{ref}/pgsodium */
  getPgsodiumConfig(ref: string): Promise<PgsodiumConfig> {
    return this.request(`/projects/${ref}/pgsodium`);
  }

  /** PUT /v1/projects/{ref}/pgsodium */
  updatePgsodiumConfig(ref: string, config: PgsodiumConfig): Promise<PgsodiumConfig> {
    return this.request(`/projects/${ref}/pgsodium`, { method: "PUT", body: config });
  }
}

// ─── Error ────────────────────────────────────────────────────────────────────

export class SupabaseManagementError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
    public readonly path: string
  ) {
    super(`Supabase Management API ${status} ${statusText} — ${path}: ${body}`);
    this.name = "SupabaseManagementError";
  }
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
