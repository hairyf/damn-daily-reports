export async function sql_queryReportCount(): Promise<number> {
  try {
    const query = db.selectFrom('Report').select(db.fn.count('id').as('count'))
    const result = await query.executeTakeFirst()
    return Number(result?.count ?? 0)
  }
  catch (error) {
    console.error(error)
    return 0
  }
}
