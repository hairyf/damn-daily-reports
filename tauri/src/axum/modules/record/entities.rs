use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Record {
  pub id: String,
  pub summary: String,
  pub data: serde_json::Value,
  pub source: String,
  #[serde(rename = "createdAt")]
  pub created_at: String,
  #[serde(rename = "updatedAt")]
  pub updated_at: String,
}

