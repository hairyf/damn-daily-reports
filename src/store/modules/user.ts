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

export const user = defineStore({
  state: () => ({
    n8nDefaultTemplateEnabled: false,
    n8nprocessStatus: 'initial' as 'initial' | 'unzipping' | 'starting' | 'running',
    n8nDefaultAccountLoginEnabled: true,
    n8nLoggedIn: false,

    // manual login
    n8nEmail: '',
    n8nPassword: '',

    deepseekKey: '',
    deepseekSkip: false,
  }),
  actions: {
    setN8nEmail(email: string) {
      this.n8nEmail = email
    },
    setN8nPassword(password: string) {
      this.n8nPassword = password
    },
  },
  getters: {
    initialized() {
      return (
        this.n8nprocessStatus === 'running'
        && this.n8nLoggedIn
        && (this.deepseekKey.length > 0 || this.deepseekSkip)
        && this.n8nDefaultTemplateEnabled
      )
    },
    status() {
      const status = this.n8nprocessStatus.toLowerCase()
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
      if (!this.deepseekKey && !this.deepseekSkip)
        return StartupState.DEEPSEEK_CONFIG
      if (!this.n8nDefaultTemplateEnabled)
        return StartupState.TEMPLATE_INIT
      return StartupState.COMPLETED
    },
  },
})

loop(async (next) => {
  user.$state.n8nprocessStatus = await invoke('get_n8n_status')
  await next(1000)
})
