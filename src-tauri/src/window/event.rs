use std::collections::HashMap;
use tauri::{GlobalWindowEvent, Manager, Runtime};

#[derive(Debug)]
struct WindowConf {
    is_initialized: bool,
    is_maximized: bool
}

pub struct WindowEventManager {
    window_conf_map: HashMap<String, WindowConf>
}

impl WindowEventManager {
    pub fn new() -> WindowEventManager {
        return WindowEventManager {
            window_conf_map: HashMap::new()
        }
    }

    pub fn window_event<R: Runtime>(&mut self, event: GlobalWindowEvent<R>) {
        match event.event() {
            tauri::WindowEvent::Resized(..) => {
                let window_label = event.window().label();
                let current_conf = self.window_conf_map.entry(String::from(window_label)).or_insert(WindowConf {
                    is_initialized: false,
                    is_maximized: false
                });
                let current_maximized = event.window().is_maximized().unwrap();
                if (!current_conf.is_initialized) || (current_conf.is_maximized != current_maximized) {
                    current_conf.is_maximized = current_maximized;
                    current_conf.is_initialized = true;
                }
            }
            _ => {}
        }
    }
}

// static WINDOW_CONF_MAP: HashMap<String, WindowConf> = HashMap::new();

// static mut IS_INITIALIZED: bool = false;
// static mut IS_MAXIMIZED: bool = false;
//
// pub fn window_event<R: Runtime>(event: GlobalWindowEvent<R>) {
//     match event.event() {
//         tauri::WindowEvent::Resized(..) => unsafe {
//             println!("{}", event.window().label());
//             let current_maximized = event.window().is_maximized().unwrap();
//             if (!IS_INITIALIZED) || (IS_INITIALIZED != current_maximized) {
//                 IS_MAXIMIZED = current_maximized;
//                 IS_INITIALIZED = true;
//             }
//         }
//         _ => {}
//     }
// }
