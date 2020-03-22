import { get_ice_servers } from './webrtc';
import { RTCConnection } from './connection';

export class HostConnection {
    constructor() {
        this.peerConnections = {};
    }

    async setup_host() {    
        //get ice servers for future
        await get_ice_servers();
    }

    async handle_signal(data) {
        const socket = data.from;
        if (socket == null) {
            return;
        }
    
        if (this.peerConnections[socket] == null) {
            this.peerConnections[socket] = new RTCConnection();
            const iceServers = await get_ice_servers();
    
            if (iceServers == null) {
                console.log("Still no ice servers!");
                return;
            }
    
            this.peerConnections[socket].start(iceServers, socket, true);
        }
    
        await this.peerConnections[socket].handle_signal(data);
    }

    target_message(data) {
        const to = data.only_to;

        if (to == null || this.peerConnections[to] == null) return;

        const message = JSON.stringify(data);
        this.peerConnections[to].send(message);
    }

    broadcast_message(data) {
        const message = JSON.stringify(data);
    
        for (const key of Object.keys(this.peerConnections)) {
            this.peerConnections[key].send(message);
        }
    }
}

