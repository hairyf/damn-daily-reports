import { loop } from '@hairy/utils'
import { invoke } from '@tauri-apps/api/core'
import { defineStore } from 'valtio-define'

export enum StartupState {
  UNZIPPING = 'unzipping',
  STARTING_SERVICE = 'starting_service',
  INITIALIZING_ACCOUNT = 'initializing_account',
  MANUAL_LOGIN = 'manual_login',
  DEEPSEEK_CONFIG = 'deepseek_config',
  TEMPLATE_INIT = 'template_init',
  COMPLETED = 'completed',
}

export interface N8nUser {
  createdAt: string
  disabled: boolean
  email: string
  featureFlags: Record<string, boolean>
  firstName: string
  globalScopes: string[]
  id: string
  isOwner: boolean
  isPending: boolean
  lastActiveAt: string
  lastName: string
  mfaAuthenticated: boolean
  mfaEnabled: boolean
  personalizationAnswers: Record<string, unknown> | null
  role: string
  settings: { userActivated: boolean }
  signInType: 'email'
}

export const user = defineStore({
  state: () => ({
    n8nprocessStatus: 'initial' as 'initial' | 'unzipping' | 'starting' | 'running',
    n8nDefaultAccountLoginEnabled: true,
    n8nLoggedIn: false,

    n8nUser: null as N8nUser | null,

    // manual login
    n8nEmail: '',
    n8nPassword: '',

    credentialId: '' as string | null,
    credentialName: '' as string | null,
    deepseekSkip: false,

    workflowId: '' as string | null,
  }),
  getters: {
    initialized() {
      return (
        !!(this.n8nprocessStatus === 'running'
          && this.n8nLoggedIn
          && (this.credentialId || this.deepseekSkip)
          && this.workflowId)
      )
    },
    status() {
      const status = this.n8nprocessStatus
      if (status === 'unzipping')
        return StartupState.UNZIPPING
      if (status === 'starting')
        return StartupState.STARTING_SERVICE
      if (!this.n8nLoggedIn) {
        if (this.n8nDefaultAccountLoginEnabled)
          return StartupState.INITIALIZING_ACCOUNT
        else
          return StartupState.MANUAL_LOGIN
      }
      if (!this.credentialId && !this.deepseekSkip)
        return StartupState.DEEPSEEK_CONFIG
      if (!this.workflowId)
        return StartupState.TEMPLATE_INIT
      return StartupState.COMPLETED
    },
  },
  // persist: {
  //   key: 'user',
  //   paths: ['credentialId', 'credentialName', 'workflowId', 'deepseekSkip', 'n8nEmail', 'n8nPassword'],
  // },
})

loop(async (next) => {
  user.$state.n8nprocessStatus = await invoke('get_n8n_status').then((r: any) => r.toLowerCase())
  await next(1000)
})
