import { useQuery } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/core'

export function useQueryN8nStatus() {
  return useQuery<'initial' | 'decompressing' | 'starting' | 'running'>({
    queryKey: ['n8n-status'],
    queryFn: () => invoke('get_n8n_status').then((r: any) => r.toLowerCase()),
    refetchInterval: 500,
  })
}
