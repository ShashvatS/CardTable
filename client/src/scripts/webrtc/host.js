import adapter from 'webrtc-adapter';
import { set_is_host, get_ice_servers } from './webrtc';
import { request_access_token, signal_user } from "../socketconnection";

console.log(adapter.browserDetails);

const peerConnections = {};


export function setup_host() {
    set_is_host(true);

    const iceServers = get_ice_servers();

    if (iceServers == null) {
        request_access_token();
        return;
    }

}

function start(socket) {
    const iceServers = get_ice_servers();

    peerConnections[socket] = {
        peerConnection: new RTCPeerConnection(iceServers),
        dataChannel: null
    };

    peerConnections[socket].peerConnection.onicecandidate = (event) => {
        if (event.candidate != null) {
            signal_user({
                to: socket,
                ice: event.candidate
            })
        }
    };

    peerConnections[socket].peerConnection.ondatachannel = event => {
        console.log("open data channel");
        peerConnections[socket].dataChannel = event.channel;
        setupDataChannel(socket);
    }
}

async function localDescCreated(socket, desc) {
    await peerConnections[socket].peerConnection.setLocalDescription(desc);
    console.log("should signal user now...");
    signal_user({
        to: socket,
        sdp: peerConnections[socket].peerConnection.localDescription,
    });
};

function setupDataChannel(socket) {
    const checkDataChannel = checkDataChannelState(socket);
    peerConnections[socket].dataChannel.onopen = checkDataChannel;
    peerConnections[socket].dataChannel.onclose = checkDataChannel;
    peerConnections[socket].dataChannel.onmessage = event =>
        insertMessageToDOM(JSON.parse(event.data), false)
}

function checkDataChannelState(socket) {
    return () => {
        console.log('WebRTC channel state is:',peerConnections[socket].dataChannel.readyState);
        if (peerConnections[socket].dataChannel.readyState === 'open') {
            insertMessageToDOM({ content: 'WebRTC data channel is now open' });
        }
    }
}

function insertMessageToDOM(options, isFromMe) {
    console.log(options);
    console.log(isFromMe);
}

export async function handle_signal(data) {
    console.log("gello world!");

    const socket = data.from;
    if (socket == null) {
        return;
    }

    if (peerConnections[socket] == null) {
        start(socket);
    }

    if (data.ice) {
        await peerConnections[socket].peerConnection.addIceCandidate(new RTCIceCandidate(data.ice));
    } else if (data.sdp) {
        await peerConnections[socket].peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));

        if (peerConnections[socket].peerConnection.remoteDescription.type === "offer") {
            const offer = await peerConnections[socket].peerConnection.createAnswer();
            localDescCreated(socket, offer);
        }
    }
}
