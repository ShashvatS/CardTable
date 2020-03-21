
import { get_is_host } from "./webrtc";
import { send_to_host as follower_send_to_host } from "./follower";
import { broadcast_message } from "./host";

function handle_message_data(data) {
    console.log("received a message", data);
}

function handle_message(data, isHost) {    
    handle_message_data(data);

    if (isHost) {
        broadcast_message(data);
    }
}

export function sendMessage(data) {
    const isHost = get_is_host();

    if (isHost === true) {
        handle_message(data, true);
    } else if (isHost === false) {
        follower_send_to_host(data);
    }
}

export function receive_message(isHost) {
    return event => handle_message(JSON.parse(event.data), isHost);
}