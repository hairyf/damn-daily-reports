import type { ArgType, ColumnType } from '@prisma/driver-adapter-utils'
import { ColumnTypeEnum, Debug } from '@prisma/driver-adapter-utils'

const debug = Debug('prisma:driver-adapter:tauri:conversion')

export function mapDeclType(declType: string): ColumnType | null {
  switch (declType.toUpperCase()) {
    case '':
      return null
    case 'DECIMAL':
      return ColumnTypeEnum.Numeric
    case 'FLOAT':
      return ColumnTypeEnum.Float
    case 'DOUBLE':
    case 'DOUBLE PRECISION':
    case 'NUMERIC':
    case 'REAL':
      return ColumnTypeEnum.Double
    case 'TINYINT':
    case 'SMALLINT':
    case 'MEDIUMINT':
    case 'INT':
    case 'INTEGER':
    case 'SERIAL':
    case 'INT2':
      return ColumnTypeEnum.Int32
    case 'BIGINT':
    case 'UNSIGNED BIG INT':
    case 'INT8':
      return ColumnTypeEnum.Int64
    case 'DATETIME':
    case 'TIMESTAMP':
      return ColumnTypeEnum.DateTime
    case 'TIME':
      return ColumnTypeEnum.Time
    case 'DATE':
      return ColumnTypeEnum.Date
    case 'TEXT':
    case 'CLOB':
    case 'CHARACTER':
    case 'VARCHAR':
    case 'VARYING CHARACTER':
    case 'NCHAR':
    case 'NATIVE CHARACTER':
    case 'NVARCHAR':
      return ColumnTypeEnum.Text
    case 'BLOB':
      return ColumnTypeEnum.Bytes
    case 'BOOLEAN':
      return ColumnTypeEnum.Boolean
    case 'JSONB':
      return ColumnTypeEnum.Json
    default:
      debug('unknown decltype:', declType)
      return null
  }
}

export function mapArg(arg: unknown, argType: ArgType): unknown {
  if (arg === null) {
    return null
  }

  if (typeof arg === 'string' && argType.scalarType === 'bigint') {
    return BigInt(arg)
  }

  if (typeof arg === 'string' && argType.scalarType === 'decimal') {
    // This can lose precision, but SQLite does not have a native decimal type.
    // This is how we have historically handled it.
    return Number.parseFloat(arg)
  }

  if (typeof arg === 'string' && argType.scalarType === 'datetime') {
    arg = new Date(arg)
  }

  if (arg instanceof Date) {
    const format = 'iso8601'
    switch (format) {
      case 'iso8601':
        return arg.toISOString().replace('Z', '+00:00')
      default:
        throw new Error(`Unknown timestamp format: ${format}`)
    }
  }

  if (typeof arg === 'string' && argType.scalarType === 'bytes') {
    return new Uint8Array(arg as any)
  }

  return arg
}
