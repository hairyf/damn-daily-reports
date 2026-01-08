import type { Selectable } from 'kysely'

export interface SourceUpdateInput {
  id: string
  name?: string
  type?: string
  description?: string
  config?: string
}

export async function sql_updateSource(input: SourceUpdateInput): Promise<Selectable<Source>> {
  const now = new Date().toISOString()

  const updateValues: {
    name?: string
    type?: string
    description?: string
    config?: string
    updatedAt?: string
  } = {}
  if (input.name !== undefined) {
    updateValues.name = input.name
  }
  if (input.type !== undefined) {
    updateValues.type = input.type
  }
  if (input.description !== undefined) {
    updateValues.description = input.description
  }
  if (input.config !== undefined) {
    updateValues.config = input.config
  }

  if (Object.keys(updateValues).length === 0) {
    // 如果没有要更新的字段，直接返回现有记录
    const result = await db
      .selectFrom('Source')
      .selectAll()
      .where('id', '=', input.id)
      .execute()
    return result[0]
  }

  // 添加 updatedAt
  updateValues.updatedAt = now

  await db
    .updateTable('Source')
    .set(updateValues)
    .where('id', '=', input.id)
    .execute()

  const result = await db
    .selectFrom('Source')
    .selectAll()
    .where('id', '=', input.id)
    .execute()

  return result[0]
}
