import { gamedata } from "../logic/gamedata";

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
        console.log('WebRTC channel state is:', dataChannel.readyState);
        startup(dataChannel, isHost);
    };
}

export function handle_close(dataChannel) {
    return () => {
        console.log('WebRTC channel state is:', dataChannel.readyState);
    };
}