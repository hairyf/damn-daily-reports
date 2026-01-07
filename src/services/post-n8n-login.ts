import { fetch } from '@tauri-apps/plugin-http'

export interface PostN8nLoginParams {
  emailOrLdapLoginId: string
  password: string
}

export function postN8nLogin(params: PostN8nLoginParams) {
  return fetch(`${N8N_API_URL}/rest/login`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
