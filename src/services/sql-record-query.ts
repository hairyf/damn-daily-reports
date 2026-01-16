import type { Selectable } from 'kysely'
import type { Record } from '../database/types'

export interface RecordQueryInput {
  search?: string
  source?: string
  page?: number
  pageSize?: number
}
export interface ReportTypeSearchInput {
  /**
   * 如果 type 为 daily，则查询 type 为 daily 的报告，且 createdAt 为今天
   * 如果 type 为 weekly，则查询 type 为 weekly 的报告，且 createdAt 为本周
   * 如果 type 为 monthly，则查询 type 为 monthly 的报告，且 createdAt 为本月
   * 如果 type 为 yearly，则查询 type 为 yearly 的报告，且 createdAt 为今年
   */
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
}
export async function sql_queryRecords(input: RecordQueryInput = {}): Promise<Selectable<Record>[]> {
  const { search, source, page = 1, pageSize = 10 } = input

  let query = db
    .selectFrom('record') // 从 record 表开始查询
    .innerJoin('source', 'source.id', 'record.sourceId') // 关联 source 表，条件是 id 匹配
    .selectAll('record') // 选中 record 表的所有字段
    .select([
      'source.name as sourceName', // 也可以顺便选出 source 的一些字段
      'source.type as sourceType',
    ])

  // 如果search不为空，添加搜索条件
  if (search) {
    const searchPattern = `%${search}%`
    query = query.where(eb =>
      eb.or([
        eb('summary', 'like', searchPattern),
      ]),
    )
  }

  // 如果 source 不为空，添加来源过滤
  if (source) {
    query = query.where('source.type', '=', 'git')
  }

  // 排序
  query = query.orderBy('createdAt', 'desc')

  // 分页
  if (pageSize) {
    const offset = page && page > 0 ? (page - 1) * pageSize : 0
    query = query.limit(pageSize).offset(offset)
  }

  return query.execute()
}
