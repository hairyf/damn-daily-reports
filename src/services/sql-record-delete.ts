import { db } from '../config/db'

export async function sql_deleteRecord(id: string) {
  return db.execute('DELETE FROM Record WHERE id = ?', [id])
}
