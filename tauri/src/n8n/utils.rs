use std::path::{Path, PathBuf};
use std::process::{Child, Command};
use std::net::TcpListener;

/// 抽象跨平台的 npx 调用逻辑
pub fn spawn_npx_command(working_dir: &Path, arg: &str) -> std::io::Result<Child> {
    let (cmd, args) = if cfg!(target_os = "windows") {
        ("cmd", vec!["/C", "npx", arg])
    } else {
        ("npx", vec![arg])
    };

    Command::new(cmd)
        .args(&args)
        .current_dir(working_dir)
        .spawn()
}

/// 获取 n8n-process 目录路径
pub fn get_n8n_process_dir() -> Option<PathBuf> {
    let current_dir = std::env::current_dir().ok()?;
    
    // 尝试几种可能的路径
    let candidates = vec![
        current_dir.join("sidecar-app").join("n8n-process"),
        current_dir.parent().map(|p| p.join("sidecar-app").join("n8n-process")).unwrap_or_default(),
        // 原始逻辑保留作为备选，但加上 correct path
        current_dir.parent().map(|p| p.join("n8n-process")).unwrap_or_default(), 
    ];

    for path in candidates {
        if path.exists() {
            return Some(path);
        }
    }
    
    None
}

/// 检查指定端口是否被占用
pub fn is_port_in_use(port: u16) -> bool {
    match TcpListener::bind(format!("127.0.0.1:{}", port)) {
        Ok(_) => false, // 端口未被占用，可以绑定
        Err(_) => true, // 端口已被占用，无法绑定
    }
}

