import { fetch } from '@tauri-apps/plugin-http'

export interface N8nNodeParameters {
  [key: string]: unknown
  path?: string
  options?: Record<string, unknown>
}

export interface N8nNode {
  parameters: N8nNodeParameters
  type: string
  typeVersion: number
  position: [number, number]
  id: string
  name: string
  webhookId?: string
}

export interface N8nConnectionItem {
  node: string
  type: string
  index: number
}

export interface N8nConnections {
  [nodeName: string]: {
    [connectionType: string]: N8nConnectionItem[][]
  }
}

export interface N8nWorkflowSettings {
  executionOrder: string
  availableInMCP: boolean
}

export interface N8nHomeProject {
  id: string
  type: string
  name: string
  icon: string | null
}

export interface PostN8nWorkflowParams {
  name: string
  nodes: N8nNode[]
  pinData?: Record<string, unknown>
  connections: N8nConnections
  active?: boolean
  settings?: N8nWorkflowSettings
  tags?: string[]
  versionId?: string
}

export interface PostN8nWorkflowResult {
  updatedAt: string
  createdAt: string
  id: string
  name: string
  description: string | null
  active: boolean
  isArchived: boolean
  nodes: N8nNode[]
  connections: N8nConnections
  settings: N8nWorkflowSettings
  staticData: unknown | null
  meta: unknown | null
  pinData: Record<string, unknown>
  versionId: string
  activeVersionId: string | null
  versionCounter: number
  triggerCount: number
  tags: string[]
  parentFolder: unknown | null
  activeVersion: unknown | null
  homeProject: N8nHomeProject
  sharedWithProjects: unknown[]
  usedCredentials: unknown[]
  scopes: string[]
  checksum: string
}

export async function postN8nWorkflow(params: PostN8nWorkflowParams) {
  return fetch(`${N8N_API_URL}/rest/workflows`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
    .then(response => response.json())
    .then(data => data as PostN8nWorkflowResult)
}
