import io from 'socket.io-client';

const socket = io();

socket.on('connect', () => {
    console.log("connected to socket!");
});

let socket_id = null;
socket.on("get-id", (data) => {
    console.log("hello world1");
    console.log(data);
    if (data.id) {
        socket_id = data.id;
    }
});

socket.on("disconnect", () => {
    socket_id = null;
    console.log("socket disconnected");
});

//run this stuff at the beginning
socket.emit("get-id", {});

export function get_socket_id() {
    return socket_id;
}

export function request_access_token_handler(f) {
    socket.on("request-access-token", f);
}

export function call_made_handler(f) {
    socket.on("call-made", f);
}

export function request_access_token() {
    socket.emit("request-access-token");
}

export function call_user(data) {
    socket.emit("call-user", data);
}





