use axum::{
  http::StatusCode,
  Json,
  extract::{Query, State},
};
use sqlx::sqlite::SqlitePool;
use std::sync::Arc;

use crate::axum::modules::record::dtos::GetRecordsParams;
use crate::axum::modules::record::service::get_records;
use crate::axum::modules::record::entities::Record;

pub async fn get(
  State(pool): State<Arc<SqlitePool>>,
  params: Query<GetRecordsParams>
) -> (StatusCode, Json<Vec<Record>>) {
  match get_records(pool, &params.r#type).await {
    Ok(records) => {
      (StatusCode::OK, Json(records))
    }
    Err(e) => {
      eprintln!("查询失败: {}", e);
      (StatusCode::INTERNAL_SERVER_ERROR, Json(vec![]))
    }
  }
}

