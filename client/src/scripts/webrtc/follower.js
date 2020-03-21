import adapter from 'webrtc-adapter';
import { set_is_host, get_ice_servers } from './webrtc';
import { request_access_token, signal_user } from "../socketconnection";

console.log(adapter.browserDetails);

let peerConnection = null;
let dataChannel = null;


let host_id = null;
export function connect_to_host(socket) {
    if (socket != null) {
        host_id = socket;
    } else if (socket == null) {
        socket = host_id;
    }

    console.log(`connect to host ${socket}`);
    set_is_host(false);

    const iceServers = get_ice_servers();

    if (iceServers == null) {
        console.log("ice servers null");
        request_access_token();
        return;
    }

    start(iceServers, socket);
}

function start(iceServers, socket) {
    peerConnection = new RTCPeerConnection(iceServers);

    peerConnection.onicecandidate = (event) => {
        console.log("found ice candidate");
        if (event.candidate != null) {
            signal_user({
                to: socket,
                ice: event.candidate
            })
        }
    };

    peerConnection.onnegotiationneeded = async () => {
        console.log("negotiation needed");
        const offer = await peerConnection.createOffer();
        await localDescCreated(socket, offer);
    };

    dataChannel = peerConnection.createDataChannel("channel");
    setupDataChannel();
}

function insertMessageToDOM(options, isFromMe) {
    console.log(options);
    console.log(isFromMe);
}

// Hook up data channel event handlers
function setupDataChannel() {
    checkDataChannelState();
    dataChannel.onopen = checkDataChannelState;
    dataChannel.onclose = checkDataChannelState;
    dataChannel.onmessage = event =>
        insertMessageToDOM(JSON.parse(event.data), false)
}

function checkDataChannelState() {
    console.log('WebRTC channel state is:', dataChannel.readyState);
    if (dataChannel.readyState === 'open') {
        insertMessageToDOM({ content: 'WebRTC data channel is now open' });
    }
}

async function localDescCreated(socket, desc) {
    await peerConnection.setLocalDescription(desc);
    console.log("should signal user now...");
    signal_user({
        to: socket,
        sdp: peerConnection.localDescription,
    });
};

export async function handle_signal(data) {
    console.log("follower received signal");
    console.log(data);

    if (peerConnection == null || data.from == null) return;

    if (data.ice) {
        peerConnection.addIceCandidate(new RTCIceCandidate(data.ice));
    } else if (data.sdp) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
        if (peerConnection.remoteDescription.type === "offer") {
            const offer = await peerConnection.createAnswer()
            await localDescCreated(data.from, offer);
        } else {
            console.log("received an answer...");
        }
    }
}

export function test_send(data) {
    if (dataChannel == null) return;
    dataChannel.send(JSON.stringify(data));
}