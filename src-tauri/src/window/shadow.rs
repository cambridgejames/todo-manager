use tauri::{ Manager, Runtime };
use window_shadows::set_shadow;

/// 添加窗口阴影
pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>, window_name: &str) {
    let window = app.get_window(window_name).unwrap();
    set_shadow(&window, true).expect("Unsupported platform!");
}
