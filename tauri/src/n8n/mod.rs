mod status;
mod utils;
mod start_n8n;

#[cfg(debug_assertions)]
mod start_n8n_dev;
#[cfg(not(debug_assertions))]
mod start_n8n_prod;

// 导出公共 API
pub use status::{N8nStatus, get_status_value};
pub use start_n8n::start_n8n;

#[tauri::command]
pub fn get_n8n_status() -> N8nStatus {
    get_status_value()
}

