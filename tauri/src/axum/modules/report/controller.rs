use axum::{
  http::StatusCode,
  Json,
  extract::State,
};
use sqlx::sqlite::SqlitePool;
use std::sync::Arc;

use crate::axum::modules::report::dtos::ReportCreateInput;
use crate::axum::modules::report::service::create_report;
use crate::axum::modules::report::entities::Report;

pub async fn post(
  State(pool): State<Arc<SqlitePool>>,
  Json(input): Json<ReportCreateInput>
) -> (StatusCode, Json<Report>) {
  match create_report(pool, input).await {
    Ok(report) => {
      (StatusCode::OK, Json(report))
    }
    Err(e) => {
      eprintln!("插入失败: {}", e);
      (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(Report {
          id: String::new(),
          name: String::new(),
          r#type: String::new(),
          content: String::new(),
          created_at: String::new(),
          updated_at: String::new(),
        }),
      )
    }
  }
}

