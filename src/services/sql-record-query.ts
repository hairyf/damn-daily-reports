import type { Record } from '../config/db.schema'
import { db } from '../config/db'

export interface RecordQueryInput {
  search?: string
  source?: string
  page?: number
  pageSize?: number
}

export async function sql_queryRecords(input: RecordQueryInput = {}): Promise<Record[]> {
  const { search, source, page = 1, pageSize = 10 } = input

  const conditions: string[] = []
  const params: any[] = []

  // 如果search不为空，添加搜索条件
  if (search) {
    conditions.push('(summary LIKE ? OR data LIKE ?)')
    const searchPattern = `%${search}%`
    params.push(searchPattern, searchPattern)
  }

  // 如果source不为空，添加来源过滤
  if (source) {
    conditions.push('source = ?')
    params.push(source)
  }

  // 构建WHERE子句
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // 构建分页
  let limitClause = ''
  if (pageSize) {
    const offset = page && page > 0 ? (page - 1) * pageSize : 0
    limitClause = `LIMIT ${pageSize} OFFSET ${offset}`
  }

  // 构建完整查询
  const query = `
    SELECT * FROM Record
    ${whereClause}
    ORDER BY createdAt DESC
    ${limitClause}
  `.trim()

  return db.select<Record[]>(query, params)
}
