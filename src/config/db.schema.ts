import { db, db_promise } from '../config/db'

export interface ReportCreateInput {
  name: string
  sourceId: string
  content: string
}

export interface Report {
  id: string
  name: string
  type: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface SourceCreateInput {
  name: string
  type: string
  description: string
  config: string
}

export interface Source {
  id: string
  name: string
  type: string
  description: string
  config: string
  createdAt: string
  updatedAt: string
}

async function main() {
  await db_promise

  // 先删除所有表
  await db.execute('DROP TABLE IF EXISTS Source;')
  await db.execute('DROP TABLE IF EXISTS Report;')

  // 启用外键约束
  await db.execute('PRAGMA foreign_keys = ON;')

  // 创建 Source 表（如果不存在）
  if (!await sql_isExistsTable('Source')) {
    await db.execute(`
      CREATE TABLE Source (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        config TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `)
  }

  // 创建 Report 表（如果不存在）
  if (!await sql_isExistsTable('Report')) {
    await db.execute(`
      CREATE TABLE Report (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `)
  }
}

main()
