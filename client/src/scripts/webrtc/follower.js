import { get_ice_servers } from './webrtc';

import { RTCConnection } from "./connection"

export class FollowerConnection {
    constructor() {
        this.conn = new RTCConnection();
    }

    async connect_to_host(socket) {
        const iceServers = await get_ice_servers();
    
        if (iceServers == null) {
            console.log("ice servers null; aborting connect to host");
            this.conn.socket = socket;
            return;
        }
    
        this.conn.start(iceServers, socket, false);
    }

    async handle_signal(data) {
        if (this.conn != null) await this.conn.handle_signal(data);
    }

    send_to_host(data) {
        if (this.conn == null) return;
        this.conn.send(JSON.stringify(data));
    }
}