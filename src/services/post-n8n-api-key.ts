import { fetch } from '@tauri-apps/plugin-http'

export interface PostN8nApiKeyParams {
  labal: string
  scopes?: string[]
  expiresAt?: string | null
}

export interface PostN8nApiKeyResult {
  apiKey: string
  audience: string
  createdAt: string
  expiresAt: string | null
  id: string
  label: string
  rawApiKey: string
  scopes: string[]
  updatedAt: string
  userId: string
}

const DEFAULT_SCOPES = [
  'credential:create',
  'credential:delete',
  'credential:move',
  'project:create',
  'project:delete',
  'project:list',
  'project:update',
  'securityAudit:generate',
  'sourceControl:pull',
  'tag:create',
  'tag:delete',
  'tag:list',
  'tag:read',
  'tag:update',
  'user:changeRole',
  'user:create',
  'user:delete',
  'user:enforceMfa',
  'user:list',
  'user:read',
  'variable:create',
  'variable:delete',
  'variable:list',
  'variable:update',
  'workflow:create',
  'workflow:delete',
  'workflow:list',
  'workflow:move',
  'workflow:read',
  'workflow:update',
  'workflowTags:update',
  'workflowTags:list',
  'workflow:activate',
  'workflow:deactivate',
  'execution:delete',
  'execution:read',
  'execution:retry',
  'execution:list',
]

export function postN8nApiKey(params: PostN8nApiKeyParams) {
  return fetch(`${N8N_API_URL}/rest/api-keys`, {
    method: 'POST',
    body: JSON.stringify({
      scopes: DEFAULT_SCOPES,
      ...params,
    }),
  })
}
