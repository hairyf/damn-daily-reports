import type { Selectable } from 'kysely'
import type { Record } from '../database/types'

export async function sql_queryRecordById(id: string): Promise<Selectable<Record> | null> {
  const result = await db
    .selectFrom('record')
    .selectAll()
    .where('id', '=', id)
    .execute()

  return result[0] || null
}
