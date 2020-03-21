import { set_is_host, get_ice_servers } from './webrtc';
import { request_access_token, signal_user } from "../socketconnection";
import { RTCConnection } from './connection';

const peerConnections = {};

export function setup_host() {
    set_is_host(true);

    const iceServers = get_ice_servers();

    if (iceServers == null) {
        request_access_token();
        return;
    }
}

export async function handle_signal(data) {
    console.log("gello world!");

    const socket = data.from;
    if (socket == null) {
        return;
    }

    if (peerConnections[socket] == null) {
        peerConnections[socket] = new RTCConnection();
        const iceServers = get_ice_servers();

        if (iceServers == null) {
            console.log("Still no ice servers!");
            return;
        }

        peerConnections[socket].start(iceServers, socket, true);
    }

    await peerConnections[socket].handle_signal(data);
}
