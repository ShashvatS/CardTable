import io from 'socket.io-client';
import { connection } from "./webrtc/webrtc";
import { set_socket_id } from './logic/my_id';


const socket = io();

socket.on('connect', () => {
    set_socket_id(socket.id);
    console.log("connected to socket!");
});

socket.on("disconnect", () => {
    console.log("socket disconnected");
});

socket.on("signal-from-user", data => {
    connection.handle_signal(data);
});

export const signal_user = data => {
    socket.emit("signal-user", data);
}




