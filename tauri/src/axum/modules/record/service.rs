use chrono::{DateTime, Utc, Local, Datelike};
use sqlx::{Row, sqlite::SqlitePool};
use std::sync::Arc;

use crate::axum::modules::record::dtos::RecordType;
use crate::axum::modules::record::entities::Record;

pub fn get_time_range(r#type: &RecordType) -> (DateTime<Utc>, DateTime<Utc>) {
  let now = Local::now();
  let date = now.date_naive();
  
  match r#type {
    RecordType::Daily => {
      let start = date.and_hms_opt(0, 0, 0).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      let end = date.and_hms_opt(23, 59, 59).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      (start, end)
    }
    RecordType::Weekly => {
      let days_from_monday = now.weekday().num_days_from_monday();
      let start_of_week = date - chrono::Duration::days(days_from_monday as i64);
      let start = start_of_week.and_hms_opt(0, 0, 0).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      let end_of_week = start_of_week + chrono::Duration::days(6);
      let end = end_of_week.and_hms_opt(23, 59, 59).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      (start, end)
    }
    RecordType::Monthly => {
      let start_date = date.with_day(1).unwrap();
      let start = start_date.and_hms_opt(0, 0, 0).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      
      // 计算月末日期：下个月的第一天减去一天
      let next_month = if date.month() == 12 {
        chrono::NaiveDate::from_ymd_opt(date.year() + 1, 1, 1).unwrap()
      } else {
        chrono::NaiveDate::from_ymd_opt(date.year(), date.month() + 1, 1).unwrap()
      };
      let end_date = next_month.pred_opt().unwrap();
      let end = end_date.and_hms_opt(23, 59, 59).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      (start, end)
    }
    RecordType::Yearly => {
      let start_date = chrono::NaiveDate::from_ymd_opt(date.year(), 1, 1).unwrap();
      let start = start_date.and_hms_opt(0, 0, 0).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      
      let end_date = chrono::NaiveDate::from_ymd_opt(date.year(), 12, 31).unwrap();
      let end = end_date.and_hms_opt(23, 59, 59).unwrap().and_local_timezone(Local).unwrap().with_timezone(&Utc);
      (start, end)
    }
  }
}

pub async fn get_records(
  pool: Arc<SqlitePool>,
  r#type: &RecordType,
) -> Result<Vec<Record>, sqlx::Error> {
  // 计算时间范围
  let (start_time, end_time) = get_time_range(r#type);
  let start_iso = start_time.to_rfc3339();
  let end_iso = end_time.to_rfc3339();

  // 查询记录，JOIN source 表获取 source 名称
  let rows = sqlx::query(
    r#"
    SELECT 
      record.id, 
      record.summary, 
      record.data, 
      source.name as source,
      record.createdAt, 
      record.updatedAt
    FROM record
    INNER JOIN source ON record.sourceId = source.id
    WHERE record.createdAt >= ? AND record.createdAt <= ?
    ORDER BY record.createdAt DESC
    "#,
  )
  .bind(&start_iso)
  .bind(&end_iso)
  .fetch_all(&*pool)
  .await?;

  let records: Vec<Record> = rows
    .into_iter()
    .map(|row| Record {
      id: row.get::<String, _>("id"),
      summary: row.get::<String, _>("summary"),
      data: serde_json::from_str(
        &row.get::<String, _>("data")
      ).unwrap_or(serde_json::json!(null)),
      source: row.get::<String, _>("source"),
      created_at: row.get::<String, _>("createdAt"),
      updated_at: row.get::<String, _>("updatedAt"),
    })
    .collect();

  Ok(records)
}
