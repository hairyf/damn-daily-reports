use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct ReportCreateInput {
  #[serde(default)]
  pub name: Option<String>,
  #[serde(default)]
  pub r#type: Option<String>,
  #[serde(alias = "text")]
  pub content: String,
}

