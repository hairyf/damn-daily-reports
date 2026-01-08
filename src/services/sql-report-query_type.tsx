import type { Selectable } from 'kysely'
import type { Report } from '../config/db.schema'
import dayjs from 'dayjs'
import { db } from '../config/db'

export interface ReportTypeSearchInput {
  /**
   * 如果 type 为 daily，则查询 type 为 daily 的报告，且 createdAt 为今天
   * 如果 type 为 weekly，则查询 type 为 weekly 的报告，且 createdAt 为本周
   * 如果 type 为 monthly，则查询 type 为 monthly 的报告，且 createdAt 为本月
   * 如果 type 为 yearly，则查询 type 为 yearly 的报告，且 createdAt 为今年
   */
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

export async function sql_queryReportType(input: ReportTypeSearchInput): Promise<Selectable<Report> | null> {
  const { type } = input

  // 根据类型计算时间范围
  let startTime: dayjs.Dayjs
  let endTime: dayjs.Dayjs

  switch (type) {
    case 'daily':
      startTime = dayjs().startOf('day')
      endTime = dayjs().endOf('day')
      break
    case 'weekly':
      startTime = dayjs().startOf('week')
      endTime = dayjs().endOf('week')
      break
    case 'monthly':
      startTime = dayjs().startOf('month')
      endTime = dayjs().endOf('month')
      break
    case 'yearly':
      startTime = dayjs().startOf('year')
      endTime = dayjs().endOf('year')
      break
  }

  // 查询匹配的报告
  const result = await db
    .selectFrom('Report')
    .selectAll()
    .where('type', '=', type)
    .where('createdAt', '>=', startTime.toDate())
    .where('createdAt', '<=', endTime.toDate())
    .orderBy('createdAt', 'desc')
    .limit(1)
    .execute()

  return result[0] || null
}
