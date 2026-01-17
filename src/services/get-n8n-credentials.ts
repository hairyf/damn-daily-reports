import { fetch } from '@tauri-apps/plugin-http'

export async function getN8nCredentials() {
  const response = await fetch(`${N8N_API_URL}/rest/credentials`, {
    method: 'GET',
  })
  return response.json()
}
