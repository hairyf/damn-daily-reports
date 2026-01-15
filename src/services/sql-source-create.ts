import type { Selectable } from 'kysely'

export interface SourceCreateInput {
  name: string
  type: string
  description: string
  enabled: boolean
  config: Record<string, any>
}

export async function sql_createSource(input: SourceCreateInput): Promise<Selectable<Source>> {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  await db
    .insertInto('source')
    .values({
      id,
      name: input.name,
      type: input.type,
      description: input.description,
      config: input.config,
      enabled: input.enabled,
      createdAt: now,
      updatedAt: now,
    })
    .execute()

  const result = await db
    .selectFrom('source')
    .selectAll()
    .where('id', '=', id)
    .execute()

  return result[0]
}
