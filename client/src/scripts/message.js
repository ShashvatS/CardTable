import { handle_startup_message } from "./logic/startup_logic";

export function handle_message(data) {
    if (data == null) return;

    console.log("received a message", data);

    if (data.startup != null) {
        handle_startup_message(data.startup);
    }
}