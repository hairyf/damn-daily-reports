import { invoke } from '@tauri-apps/api/core'

export interface InvokeCollectClickupParams {
  token: string
  team: string
  user: string
}

export interface ClickupTask {
  id: string
  name: string
  status: string
  list: string
  date_updated: string
}

export interface InvokeCollectClickupResult {
  tasks: ClickupTask[]
  count: number
}

export function invokeCollectClickup(params: InvokeCollectClickupParams) {
  return invoke<InvokeCollectClickupResult>('collect/clickup', params as unknown as Record<string, unknown>)
}
