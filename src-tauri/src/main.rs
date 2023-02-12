#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod window;

use crate::window::shadow::set_window_shadow;
use crate::window::event::WindowEventManager;

fn main() {
    let app = tauri::Builder::default()
        .setup(|app| {
            set_window_shadow(app, "mainApplication");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![]);
    app.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
