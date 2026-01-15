import { db } from '../database'

export async function sql_deleteSource(id: string) {
  return db.deleteFrom('source').where('id', '=', id).execute()
}
