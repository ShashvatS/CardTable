import { set_is_host, get_ice_servers } from './webrtc';

import { RTCConnection } from "./connection"

const conn = new RTCConnection();

export async function connect_to_host(socket) {
    console.log(socket);
    set_is_host(false);
    const iceServers = await get_ice_servers();

    if (iceServers == null) {
        console.log("ice servers null; aborting connect to host");
        conn.socket = socket;
        return;
    }

    conn.start(iceServers, socket, false);
}

export async function handle_signal(data) {
    if (conn != null) await conn.handle_signal(data);
}

export function send_to_host(data) {
    if (conn == null) return;
    conn.send(JSON.stringify(data));
}