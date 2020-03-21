import { connect_to_host } from "./follower";
import { setup_host } from "./host";

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

export function get_ice_servers() {
    return iceServers;
}

export function handle_token(token) {
    if (token.iceServers == null) {
        return;
    }

    iceServers = token.iceServers;
    console.log(iceServers);

    if (is_host === true) {
        setup_host();
    }
    else if (is_host === false) {
        connect_to_host(null);
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




