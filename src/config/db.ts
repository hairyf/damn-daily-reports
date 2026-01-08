import type { DB } from './db.schema'
import Database from '@tauri-apps/plugin-sql'
import { Kysely, sql } from 'kysely'
import { TauriSqliteDialect } from 'kysely-dialect-tauri'

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({ database: () => Database.load('sqlite:main.db') }),
})

async function main() {
  if (!sql_isExistsTable('Source')) {
    await db.schema.createTable('Source')
      .addColumn('id', 'text', col => col.primaryKey())
      .addColumn('name', 'text', col => col.notNull())
      .addColumn('type', 'text', col => col.notNull())
      .addColumn('description', 'text', col => col.notNull())
      .addColumn('config', 'text', col => col.notNull())
      .addColumn('createdAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
      .addColumn('updatedAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
      .execute()
  }

  if (!sql_isExistsTable('Report')) {
    await db.schema.createTable('Report')
      .addColumn('id', 'text', col => col.autoIncrement().primaryKey())
      .addColumn('name', 'text', col => col.notNull())
      .addColumn('type', 'text', col => col.notNull())
      .addColumn('content', 'text', col => col.notNull())
      .addColumn('createdAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
      .addColumn('updatedAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
      .execute()
  }

  if (!sql_isExistsTable('Record')) {
    await db.schema.createTable('Record')
      .addColumn('id', 'text', col => col.primaryKey())
      .addColumn('summary', 'text', col => col.notNull())
      .addColumn('data', 'text', col => col.notNull())
      .addColumn('source', 'text', col => col.notNull())
      .addColumn('createdAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
      .addColumn('updatedAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`))
      .execute()
  }
}

main()
