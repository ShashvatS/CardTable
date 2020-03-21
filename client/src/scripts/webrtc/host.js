import { set_is_host, get_ice_servers } from './webrtc';
import { RTCConnection } from './connection';

const peerConnections = {};

export async function setup_host() {
    set_is_host(true);

    //get ice servers for future
    await get_ice_servers();
}

export async function handle_signal(data) {
    const socket = data.from;
    if (socket == null) {
        return;
    }

    if (peerConnections[socket] == null) {
        peerConnections[socket] = new RTCConnection();
        const iceServers = await get_ice_servers();

        if (iceServers == null) {
            console.log("Still no ice servers!");
            return;
        }

        peerConnections[socket].start(iceServers, socket, true);
    }

    await peerConnections[socket].handle_signal(data);
}
