#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod window;

use crate::window::shadow::set_window_shadow;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            set_window_shadow(app, "mainApplication");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
