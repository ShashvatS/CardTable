import io from 'socket.io-client';
import { handle_signal } from "./webrtc/webrtc";


const socket = io();

let connected = false;
socket.on('connect', () => {
    connected = true;
    console.log("connected to socket!");
});

socket.on("disconnect", () => {
    connected = false;
    console.log("socket disconnected");
});

socket.on("signal-from-user", handle_signal);

export const get_socket_id = () => {
    if (connected) return socket.id;
    else return null;
}

export const signal_user = data => {
    socket.emit("signal-user", data);
}




