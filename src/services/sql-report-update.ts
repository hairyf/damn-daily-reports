import type { Report } from '../config/db.schema'
import { db } from '../config/db'

export interface ReportUpdateInput {
  id: string
  name?: string
  type?: string
  content?: string
}

export async function sql_updateReport(input: ReportUpdateInput): Promise<Report> {
  const now = new Date().toISOString()
  const updates: string[] = []
  const params: any[] = []

  if (input.name !== undefined) {
    updates.push('name = ?')
    params.push(input.name)
  }

  if (input.type !== undefined) {
    updates.push('type = ?')
    params.push(input.type)
  }

  if (input.content !== undefined) {
    updates.push('content = ?')
    params.push(input.content)
  }

  if (updates.length === 0) {
    // 如果没有要更新的字段，直接返回现有记录
    const result = await db.select<Report[]>(
      'SELECT * FROM Report WHERE id = ?',
      [input.id],
    )
    return result[0]
  }

  // 添加 updatedAt
  updates.push('updatedAt = ?')
  params.push(now)

  // 添加 id 作为 WHERE 条件
  params.push(input.id)

  await db.execute(
    `UPDATE Report SET ${updates.join(', ')} WHERE id = ?`,
    params,
  )

  const result = await db.select<Report[]>(
    'SELECT * FROM Report WHERE id = ?',
    [input.id],
  )

  return result[0]
}
