import type { Record } from '../config/db.schema'
import { db } from '../config/db'

export async function sql_queryRecordById(id: string): Promise<Record | null> {
  const result = await db.select<Record[]>(
    'SELECT * FROM Record WHERE id = ?',
    [id],
  )

  return result[0] || null
}
