use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Report {
  pub id: String,
  pub name: String,
  #[serde(rename = "type")]
  pub r#type: String,
  pub content: String,
  #[serde(rename = "createdAt")]
  pub created_at: String,
  #[serde(rename = "updatedAt")]
  pub updated_at: String,
}

