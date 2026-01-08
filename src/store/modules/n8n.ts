import { loop } from '@hairy/utils'
import { invoke } from '@tauri-apps/api/core'
import { defineStore } from 'valtio-define'

export const n8n = defineStore({
  state: () => ({
    status: 'initial' as 'initial' | 'starting' | 'running',
    loggedIn: false,
  }),
  actions: {},
})

loop(async (next) => {
  n8n.$state.status = await invoke('get_n8n_status')
  if (n8n.$state.status !== 'running')
    await next(1000)
})
