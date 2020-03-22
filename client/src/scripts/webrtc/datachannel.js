import { gamedata } from "../logic/gamedata";
import { notify } from "../../components/NotificationSystem";

function startup(dataChannel, isHost) {
    if (isHost) {
        const data = {
            init: gamedata.state
        };

        dataChannel.send(JSON.stringify(data));
    }
}

export function handle_open(dataChannel, isHost) {
    return () => {
        if (!isHost) {
            notify("success", "Connected to host");
        }

        startup(dataChannel, isHost);
    };
}

export function handle_state_change(peerConnection, isHost) {
    return () => {
        if (isHost) return;

        if (peerConnection.connectionState === "disconnected" || peerConnection.connectionState === "failed") {
            //TODO: prevent this from triggering twice
            notify("warning", "Host disconnected unexpectedly");
        }
    }
}

export function handle_close(_dataChannel, isHost) {
    return () => {
        if (!isHost) {
            notify("default", "Disconnected from host.");
        }

    };
}