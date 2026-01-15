import type { Selectable } from 'kysely'
import type { Report } from '../database/types'

export async function sql_queryReportById(id: string): Promise<Selectable<Report> | null> {
  const result = await db
    .selectFrom('report')
    .selectAll()
    .where('id', '=', id)
    .execute()

  return result[0] || null
}
