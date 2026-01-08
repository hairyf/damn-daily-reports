import type { Selectable } from 'kysely'

export async function sql_querySourceById(id: string): Promise<Selectable<Source> | null> {
  const result = await db
    .selectFrom('Source')
    .selectAll()
    .where('id', '=', id)
    .execute()

  return result[0] || null
}
