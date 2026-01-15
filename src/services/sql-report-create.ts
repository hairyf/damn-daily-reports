import type { Selectable } from 'kysely'
import type { Report } from '../database/types'

export interface ReportCreateInput {
  name: string
  type: string
  content: string
}

export async function sql_createReport(input: ReportCreateInput): Promise<Selectable<Report>> {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  await db
    .insertInto('report')
    .values({
      id,
      name: input.name,
      type: input.type,
      content: input.content,
      createdAt: now,
      updatedAt: now,
    })
    .execute()

  const result = await db
    .selectFrom('report')
    .selectAll()
    .where('id', '=', id)
    .execute()

  return result[0]
}
