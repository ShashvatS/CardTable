import { startup } from "../logic/startup_logic";

export function handle_open(dataChannel) {
    return () => {
        console.log('WebRTC channel state is:', dataChannel.readyState);
        startup();
    };
}

export function handle_close(dataChannel) {
    return () => {
        console.log('WebRTC channel state is:', dataChannel.readyState);
    };
}