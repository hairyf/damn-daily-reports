import type { Selectable } from 'kysely'
import type { Report } from '../database/types'

export interface ReportUpdateInput {
  id: string
  name?: string
  type?: string
  content?: string
}

export async function sql_updateReport(input: ReportUpdateInput): Promise<Selectable<Report>> {
  const now = new Date().toISOString()

  const updateValues: {
    name?: string
    type?: string
    content?: string
    updatedAt?: string
  } = {}
  if (input.name !== undefined) {
    updateValues.name = input.name
  }
  if (input.type !== undefined) {
    updateValues.type = input.type
  }
  if (input.content !== undefined) {
    updateValues.content = input.content
  }

  if (Object.keys(updateValues).length === 0) {
    // 如果没有要更新的字段，直接返回现有记录
    const result = await db
      .selectFrom('report')
      .selectAll()
      .where('id', '=', input.id)
      .execute()
    return result[0]
  }

  // 添加 updatedAt
  updateValues.updatedAt = now

  await db
    .updateTable('report')
    .set(updateValues)
    .where('id', '=', input.id)
    .execute()

  const result = await db
    .selectFrom('report')
    .selectAll()
    .where('id', '=', input.id)
    .execute()

  return result[0]
}
