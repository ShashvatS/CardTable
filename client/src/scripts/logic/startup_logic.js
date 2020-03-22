import { connection } from "../webrtc/webrtc";
import { get_client_id, get_socket_id } from "./my_id";
import { HostData } from "./host";

import { gamedata } from "./gamedata";

export function startup() {
    console.log("called startup");

    const client = get_client_id();
    const socket = get_socket_id();

    if (client == null) {
        //cannot reach here without requesting ice servers
        console.log("startup error; client cookie not found");
    }

    const data = {
        only_to: "$host",
        startup: {
            request: "need-set-name?",
            client: client,
            socket: socket,
        }
    };

    connection.sendMessage(data);
}

export function handle_startup_message(startup_data) {
    const request = startup_data.request;

    if (request == null) {
        return;
    }

    //from host
    if (request === "need-set-name?") {
        const client = startup_data.client;
        const socket = startup_data.socket;
        if (client == null || socket == null) return;

        const name = HostData.client2names[client];

        console.log(name, name == null);

        const data = {
            only_to: socket,
            startup: {
                request: "need-set-name-response",
                need_set: (name == null)
            }
        };

        connection.sendMessage(data);
    }

    else if (request === "need-set-name-response") {
        if (startup_data.need_set === false) {
            gamedata.state.setup = true;
            gamedata.dispatchEvent(new Event("startup-event"));
        }
        else if (startup_data.need_set === true) {
            gamedata.state.need_name = true;
            gamedata.state.setup = false;
            gamedata.dispatchEvent(new Event("startup-event"));
        }
    }

    else if (request === "set-name?") {
        const client = startup_data.client;
        const name = startup_data.name;
        const socket = startup_data.socket;

        if (client == null || name == null || socket == null) return;

        //already has a name
        if (HostData.client2names[client] != null) return;

        if (HostData.names2client[name] == null) {
            HostData.names2client[name] = client;
            HostData.client2names[client] = name;

            const data = {
                only_to: socket,
                startup: {
                    request: "need-set-name-response",
                    need_set: false
                }
            };

            connection.sendMessage(data);
        } else {
            const data = {
                only_to: socket,
                startup: {
                    request: "need-set-name-response",
                    need_set: false,
                    reason: "name taken already"
                }
            };

            connection.sendMessage(data);
        }

    }

}