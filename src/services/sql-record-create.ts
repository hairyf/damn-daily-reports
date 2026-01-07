import type { Record, RecordCreateInput } from '../config/db.schema'
import { db } from '../config/db'

export async function sql_createRecord(input: RecordCreateInput): Promise<Record> {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  await db.execute(
    'INSERT INTO Record (id, summary, source, data, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
    [id, input.summary, input.source, input.data, now, now],
  )

  const result = await db.select<Record[]>(
    'SELECT * FROM Record WHERE id = ?',
    [id],
  )

  return result[0]
}
