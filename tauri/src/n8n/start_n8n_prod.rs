use crate::n8n::status;

/// 生产环境启动 n8n 进程
#[cfg(not(debug_assertions))]
pub fn start_n8n_prod() {
    status::set_status(status::N8nStatus::Unzipping);
}

