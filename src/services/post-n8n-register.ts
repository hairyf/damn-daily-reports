import { fetch } from '@tauri-apps/plugin-http'

export interface PostN8nRegisterParams {
  agree: boolean
  email: string
  firstName: string
  lastName: string
  password: string
}

export function postN8nRegister(params: PostN8nRegisterParams) {
  return fetch(`${N8N_API_URL}/rest/owner/setup`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
