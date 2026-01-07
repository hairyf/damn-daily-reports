import type { Record } from '../config/db.schema'
import { db } from '../config/db'

export interface RecordUpdateInput {
  id: string
  summary?: string
  source?: string
  data?: string
}

export async function sql_updateRecord(input: RecordUpdateInput): Promise<Record> {
  const now = new Date().toISOString()
  const updates: string[] = []
  const params: any[] = []

  if (input.summary !== undefined) {
    updates.push('summary = ?')
    params.push(input.summary)
  }

  if (input.source !== undefined) {
    updates.push('source = ?')
    params.push(input.source)
  }

  if (input.data !== undefined) {
    updates.push('data = ?')
    params.push(input.data)
  }

  if (updates.length === 0) {
    // 如果没有要更新的字段，直接返回现有记录
    const result = await db.select<Record[]>(
      'SELECT * FROM Record WHERE id = ?',
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
    `UPDATE Record SET ${updates.join(', ')} WHERE id = ?`,
    params,
  )

  const result = await db.select<Record[]>(
    'SELECT * FROM Record WHERE id = ?',
    [input.id],
  )

  return result[0]
}
