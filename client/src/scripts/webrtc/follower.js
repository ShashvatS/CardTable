import { set_is_host, get_ice_servers } from './webrtc';
import { request_access_token} from "../socketconnection";

import { RTCConnection } from "./connection"

const conn = new RTCConnection();

export function connect_to_host(socket) {
    set_is_host(false);
    const iceServers = get_ice_servers();

    if (iceServers == null) {
        console.log("ice servers null");
        conn.socket = socket;
        request_access_token();
        return;
    }

    conn.start(iceServers, socket, false);
}

export async function handle_signal(data) {
    if (conn != null) await conn.handle_signal(data);
}

export function test_send(data) {
    if (conn.dataChannel == null) return;
    conn.dataChannel.send(JSON.stringify(data));
}