import { db } from '../database'

export async function sql_deleteReport(id: string) {
  return db.deleteFrom('report').where('id', '=', id).execute()
}
