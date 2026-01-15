import { db } from '../database'

export async function sql_deleteRecord(id: string) {
  return db.deleteFrom('record').where('id', '=', id).execute()
}
