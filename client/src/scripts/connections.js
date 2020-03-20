import { request_access_token_handler, request_access_token, call_user, call_made_handler, get_socket_id } from "./socketconnection";
import Cookies from 'js-cookie';
import Peer from "peerjs-client";

let is_host = null;
let access_token = null;
let peer = null;

export function get_is_host() {
    return is_host;
}

request_access_token_handler(async (token) => {
    access_token = token;

    if (is_host === true) {
        await setup_host();
    }
    else if (is_host === false) {
        await connect_to_host();
    }
});

call_made_handler(async (data) => {
    if (peer == null || data.client_id == null) {
        return;
    }

    var conn = peer.connect(data.client_id);

    conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data) {
            console.log('Received', data);
        });

        // Send messages
        conn.send('Hello!');
    });

});

export async function setup_host() {
    is_host = true;

    if (access_token == null) {
        request_access_token();
        return;
    }

    let socket_id = get_socket_id();

    if (socket_id == null) return;

    const protocol = window.location.protocol.replace(/:/g,'');
    peer = new Peer(socket_id, {
        host: window.location.hostname,
        port: window.location.port || (protocol === 'https' ? '443' : '80'),
        path: '/peerjs',
        config: {
            iceServers: access_token["ice_servers"]
        }
    });
}

export async function connect_to_host(socket) {
    is_host = false;
    if (access_token == null) {
        request_access_token();
        return;
    }

    let socket_id = get_socket_id();

    if (socket_id == null) return;

    // peer = Peer(socket_id, {
    //     config: {
    //         iceServers: access_token["ice_servers"]
    //     }
    // });

    call_user({
        to: socket,
        client_id: socket_id
    });

    // peer.on('connection', function (conn) {
    //     conn.on('open', function () {
    //         // Receive messages
    //         conn.on('data', function (data) {
    //             console.log('Received', data);
    //         });

    //         // Send messages
    //         conn.send('Hello!');
    //     });
    // });
}
