use tauri::{Manager, path::BaseDirectory};
use sqlx::sqlite::{SqlitePool, SqliteConnectOptions};
use std::path::PathBuf;

/// 初始化数据库连接池并存储到应用状态
/// 返回连接池以便传递给其他服务（如 Axum 服务器）
pub fn connect(app: &tauri::App) -> Result<SqlitePool, Box<dyn std::error::Error>> {
    let app_handle = app.handle().clone();
    
    println!("Initializing Database Connection...");
    
    // 在同步上下文中使用 block_on 来初始化数据库
    tauri::async_runtime::block_on(async move {
        // 获取数据库路径
        let db_path = app_handle
            .path()
            .resolve("main.db", BaseDirectory::AppData)
            .map_err(|e| format!("Failed to resolve database path: {}", e))?;
        
        // 确保数据库目录存在
        let db_dir = db_path.parent().ok_or("Failed to get database directory")?;
        std::fs::create_dir_all(db_dir)
            .map_err(|e| format!("Failed to create database directory: {}", e))?;
        
        // 配置数据库连接选项
        let options = SqliteConnectOptions::new()
            .filename(&db_path)
            .create_if_missing(true);
        
        // 创建连接池
        let pool = SqlitePool::connect_with(options).await
            .map_err(|e| format!("Failed to connect to database: {}", e))?;
        
        // 将连接池存储到应用状态中（用于 Tauri 命令）
        app_handle.manage(std::sync::Mutex::new(pool.clone()));
        
        Ok(pool)
    })
}

/// 从应用状态中获取数据库连接池
/// 用于 Tauri 命令中访问数据库
#[allow(dead_code)]
pub fn get_database_pool(app: &tauri::AppHandle) -> Result<SqlitePool, Box<dyn std::error::Error>> {
    let pool_mutex = app.state::<std::sync::Mutex<SqlitePool>>();
    let pool = pool_mutex.lock()
        .map_err(|e| format!("Failed to get database pool lock: {}", e))?;
    Ok(pool.clone())
}

/// 获取数据库文件路径
#[allow(dead_code)]
pub fn get_database_path(app: &tauri::AppHandle) -> Result<PathBuf, Box<dyn std::error::Error>> {
    let db_path = app
        .path()
        .resolve("main.db", BaseDirectory::AppData)
        .map_err(|e| format!("Failed to resolve database path: {}", e))?;
    Ok(db_path)
}

