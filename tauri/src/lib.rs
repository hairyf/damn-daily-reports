mod n8n;
mod collector;
mod database;
mod axum;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use database::migration;
use database::connection;

    pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            n8n::start_n8n();
            migration::migrate(app)?;
            
            match connection::connect(app) {
                Ok(pool) => {
                    println!("✓ Database Connection Successful");
                    axum::start(pool);
                }
                Err(e) => {
                    eprintln!("✗ Database Connection Failed: {}", e);
                    eprintln!("  Axum Service will not start");
                }
            }
            Ok(())
        })
        // HTTP plugin
        .plugin(tauri_plugin_http::init())
        // Sql store plugin
        .plugin(tauri_plugin_sql::Builder::default().build())
        // Simple Store plugin
        .plugin(tauri_plugin_store::Builder::new().build())
        // Notification plugin
        .plugin(tauri_plugin_notification::init())
        // Opener plugin
        .plugin(tauri_plugin_opener::init())
        // Dialog plugin
        .plugin(tauri_plugin_dialog::init())
        // FS plugin
        .plugin(tauri_plugin_fs::init())
        // Custom protocol plugin
        .invoke_handler(tauri::generate_handler![
            n8n::get_n8n_status,
            collector::clickup::collect_daily_clickup,
            collector::git::collect_daily_git
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
