import type { DB } from './types'
import Database from '@tauri-apps/plugin-sql'
import { Kysely } from 'kysely'
import { TauriSqliteDialect } from 'kysely-dialect-tauri'

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({ database: () => Database.load('sqlite:main.db') }),
})

/**
 * 删除 record 和 report 表中的所有数据，保留 source 表数据
 */
export async function clearRecordAndReportData() {
  await Promise.all([
    db.deleteFrom('record').execute(),
    db.deleteFrom('report').execute(),
  ])
}
