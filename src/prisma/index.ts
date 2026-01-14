import type { Proxyed } from '@hairy/utils'
import type { ColumnType, Queryable, Result, SqlQuery, SqlQueryable, SqlResultSet } from '@prisma/driver-adapter-utils'
import type Database from '@tauri-apps/plugin-sql'
import { proxy } from '@hairy/utils'
import { PrismaClient } from '@prisma/client'
import {
  ColumnTypeEnum,
  Debug,
} from '@prisma/driver-adapter-utils'
import { mapArg, mapDeclType } from './conversion'

const debug = Debug('prisma:driver-adapter:mssql')

export class TauriSqliteAdapter implements SqlQueryable {
  readonly provider = 'sqlite'
  readonly adapterName = '@prisma/adapter-tauri-sqlite'
  private db: Proxyed<Database> = proxy<Database>()

  // 缓存表的结构，避免重复查询元数据
  private tableMetaCache: Map<string, Array<{ name: string, type: string }>> = new Map()

  // 辅助函数：根据 SQL 尝试获取表名并查询其声明类型
  private async getDeclaredTypes(sql: string): Promise<Record<string, string>> {
    // 简单的正则匹配 SELECT ... FROM "TableName"
    const match = sql.match(/FROM\s+["`]?(\w+)["`]?/i)
    if (!match)
      return {}

    const tableName = match[1]
    if (this.tableMetaCache.has(tableName)) {
      return Object.fromEntries(this.tableMetaCache.get(tableName)!.map(c => [c.name, c.type]))
    }

    // 查询 SQLite 内部表结构
    const info = await this.db.select<any[]>(`PRAGMA table_info("${tableName}")`)
    this.tableMetaCache.set(tableName, info)

    return Object.fromEntries(info.map(c => [c.name, c.type]))
  }

  constructor(db: Database | Promise<Database>) {
    if (db instanceof Promise)
      db.then(db => this.db.proxy.update(db))
    else
      this.db.proxy.update(db)
  }

  // 执行查询（SELECT），返回结果集
  async queryRaw(query: SqlQuery): Promise<SqlResultSet> {
    const tag = '[js::query_raw]'
    debug(`${tag} %O`, query)
    const result = await this.db.select<any[]>(query.sql, query.args)
    const declaredTypesMap = await this.getDeclaredTypes(query.sql)

    const columnNames = result.length > 0 ? Object.keys(result[0]) : []

    const columnTypes = columnNames.map((name) => {
      const sqliteType = declaredTypesMap[name]?.toUpperCase() || ''
      return this.sqliteTypeToPrismaType(sqliteType, result[0]?.[name])
    })

    const rows = result.map(row => columnNames.map(name => row[name]))

    return {
      columnNames,
      columnTypes,
      rows,
    }
  }

  private sqliteTypeToPrismaType(sqliteType: string, sampleValue: any): ColumnType {
    return mapDeclType(sqliteType.toUpperCase()) || this.inferFromValue(sampleValue)
  }

  /**
   * 辅助方法：将 JS 类型映射为 Prisma 的 ColumnType
   */
  private inferFromValue(value: any): ColumnType {
    if (value === null || value === undefined)
      return ColumnTypeEnum.Text // 默认
    switch (typeof value) {
      case 'number':
        return Number.isInteger(value) ? ColumnTypeEnum.Int32 : ColumnTypeEnum.Double
      case 'bigint':
        return ColumnTypeEnum.Int64
      case 'boolean':
        return ColumnTypeEnum.Boolean
      case 'object':
        if (value instanceof Date)
          return ColumnTypeEnum.DateTime
        if (value instanceof Uint8Array)
          return ColumnTypeEnum.Bytes
        return ColumnTypeEnum.Text
      default:
        return ColumnTypeEnum.Text
    }
  }

  // 执行非查询（INSERT, UPDATE, DELETE），返回受影响行数
  async executeRaw(query: SqlQuery): Promise<number> {
    const result = await this.db.execute(query.sql, query.args)
    return result.rowsAffected
  }
}
