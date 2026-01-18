use serde::Deserialize;

#[derive(Debug, Deserialize)] 
pub struct GetRecordsParams {
  pub r#type: RecordType,
  #[serde(alias = "workflowId")]
  pub workflow_id: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum RecordType {
  Daily,
  Weekly,
  Monthly,
  Yearly,
}