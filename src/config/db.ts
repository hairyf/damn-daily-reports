import type { Generated } from 'kysely'
import Database from '@tauri-apps/plugin-sql'
import { Kysely } from 'kysely'
import { TauriSqliteDialect } from 'kysely-dialect-tauri'

export interface Report {
  id: Generated<number>
  name: string
  type: string
  content: string
  createdAt: string
  updatedAt: string
}
export interface Source {
  id: Generated<number>
  name: string
  type: string
  description: string
  config: string
  createdAt: string
  updatedAt: string
}

export interface Record {
  id: Generated<number>
  summary: string
  data: string
  source: string
  createdAt: string
  updatedAt: string
}

export interface DB {
  Report: Report
  Source: Source
  Record: Record
}

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({ database: () => Database.load('sqlite:main.db') }),
})
