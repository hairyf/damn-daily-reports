import type { Selectable } from 'kysely'
import type { Record } from '../database/types'

export interface RecordCreateInput {
  summary: string
  source: string
  data: { [key: string]: any }
}

export async function sql_createRecord(input: RecordCreateInput): Promise<Selectable<Record>> {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  await db
    .insertInto('record')
    .values({
      id,
      summary: input.summary,
      source: input.source,
      data: input.data,
      createdAt: now,
      updatedAt: now,
    })
    .executeTakeFirst()

  const result = await db
    .selectFrom('record')
    .selectAll()
    .where('id', '=', id)
    .execute()

  return result[0]
}
