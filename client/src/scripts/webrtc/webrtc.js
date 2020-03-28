import { FollowerConnection } from "./follower";
import { HostConnection } from "./host";

import { handle_message } from "../message";
import { start_game } from "../logic/gamedata";

let iceServers = null;

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

//TODO: better reconnect logic
export const connection = {
    is_host: null,
    host_conn: new HostConnection(),
    follower_conn: new FollowerConnection(),
    hosted_before: false,
    message_counter: 0,

    async connect_to_host(socket) {
        if (this.follower_conn.conn.socket != null) {
            //aready tried to connect to this socket
            if (this.follower_conn.conn.socket == null) {
                return;
            } else {
                //otherwise, create a new connection and continue
                this.follower_conn = new FollowerConnection();
            }
        }


        this.is_host = false;
        await this.follower_conn.connect_to_host(socket);
    },

    async setup_host(gameCode, usePrevState) {
        if (this.hosted_before) {
            this.host_conn = new HostConnection();
            this.message_counter = 0
        }

        this.is_host = true;
        this.hosted_before = true;
        await this.host_conn.setup_host();

        start_game(gameCode, usePrevState);
    },

    async handle_signal(data) {
        if (this.is_host === true) {
            await this.host_conn.handle_signal(data);
        } else if (this.is_host === false) {
            await this.follower_conn.handle_signal(data);
        }
    },

    handleMessage(data) {
        if (this.is_host === true) {
            data.message_counter = this.message_counter;
            this.host_conn.broadcast_message(data);

            this.message_counter += 1;
        }

        handle_message(data);
    },

    sendMessage(data) {
        if (this.is_host === true) {
            this.handleMessage(data);
        } else if (this.is_host === false) {
            this.follower_conn.send_to_host(data);
        }
    }

};

export const receive_message = event => {
    connection.handleMessage(JSON.parse(event.data));
}


