import { fetch } from '@tauri-apps/plugin-http'

export interface PostN8nWorkflowResult {
  updatedAt: string
  createdAt: string
  id: string
  name: string
}

export async function postN8nWorkflow(params: any) {
  return fetch(`${N8N_API_URL}/rest/workflows`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(params),
  })
    .then(response => response.json())
    .then(data => data?.data as PostN8nWorkflowResult | null)
}
