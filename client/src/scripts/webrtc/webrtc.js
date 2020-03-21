import { handle_signal as handle_signal_follower } from "./follower";
import { handle_signal as handle_signal_host } from "./host";

let is_host = null;
let iceServers = null;

export function get_is_host() {
    return is_host;
}
export function set_is_host(host) {
    is_host = host;
}

export async function get_ice_servers() {
    if (iceServers != null) return iceServers;

    let response = await fetch("/api/iceservers", {
        method: "POST"
    });

    let data = await response.json();

    if (data.success) {
        iceServers = data.iceServers;
        return iceServers;
    } else {
        console.log("Could not get ice servers");
        console.log(data.reason);

        return null;
    }
}

export async function handle_signal(data) {
    console.log("received a signal");

    if (is_host === true) {
        await handle_signal_host(data);
    } else if (is_host === false) {
        await handle_signal_follower(data);
    }
}




