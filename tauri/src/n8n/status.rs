use std::sync::{Mutex, OnceLock};

#[derive(Debug, Clone, serde::Serialize, PartialEq)]
pub enum N8nStatus {
    Initial,
    // only for production environment
    Unzipping,
    Starting,
    Running,
}

// 使用静态变量在模块内部管理状态
static N8N_STATUS: OnceLock<Mutex<N8nStatus>> = OnceLock::new();

pub fn get_status() -> &'static Mutex<N8nStatus> {
    N8N_STATUS.get_or_init(|| Mutex::new(N8nStatus::Initial))
}

pub fn set_status(status: N8nStatus) {
    *get_status().lock().unwrap() = status;
}

pub fn get_status_value() -> N8nStatus {
    get_status().lock().unwrap().clone()
}

