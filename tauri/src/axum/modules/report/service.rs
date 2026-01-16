use sqlx::sqlite::SqlitePool;
use sqlx::Row;
use uuid::Uuid;
use chrono::Utc;
use std::sync::Arc;

use crate::axum::modules::report::dtos::ReportCreateInput;
use crate::axum::modules::report::entities::Report;

pub async fn create_report(
  pool: Arc<SqlitePool>,
  input: ReportCreateInput,
) -> Result<Report, sqlx::Error> {
  // 生成 UUID
  let id = Uuid::new_v4().to_string();
  
  // 生成当前时间戳（ISO 8601 格式）
  let now = Utc::now().to_rfc3339();

  // 为缺失的字段提供默认值
  let name = input.name.unwrap_or_else(|| {
    format!("报告 {}", Utc::now().format("%Y-%m-%d %H:%M:%S"))
  });
  let report_type = input.r#type.unwrap_or_else(|| "daily".to_string());

  // 插入报告
  sqlx::query(
    r#"
    INSERT INTO report (id, name, type, content, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
    "#,
  )
  .bind(&id)
  .bind(&name)
  .bind(&report_type)
  .bind(&input.content)
  .bind(&now)
  .bind(&now)
  .execute(&*pool)
  .await?;

  // 查询刚插入的报告
  let row = sqlx::query(
    r#"
    SELECT id, name, type, content, createdAt, updatedAt
    FROM report
    WHERE id = ?
    "#,
  )
  .bind(&id)
  .fetch_one(&*pool)
  .await?;

  let report = Report {
    id: row.get::<String, _>("id"),
    name: row.get::<String, _>("name"),
    r#type: row.get::<String, _>("type"),
    content: row.get::<String, _>("content"),
    created_at: row.get::<String, _>("createdAt"),
    updated_at: row.get::<String, _>("updatedAt"),
  };

  Ok(report)
}

