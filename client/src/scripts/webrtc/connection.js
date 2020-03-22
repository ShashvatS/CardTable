import { signal_user } from "../socketconnection";
import adapter from 'webrtc-adapter';

import { handle_open, handle_close } from "./datachannel";
import { receive_message } from "./webrtc";

console.log(adapter.browserDetails);

//TODO: deal with nulls and other errors that might happen
export class RTCConnection {
    constructor() {
        this.socket = null;
        this.peerConnection = null;
        this.dataChannel = null;
        this.isHost = null;
    }

    start(iceServers, socket, isHost) {
        if (socket != null) this.socket = socket;

        this.peerConnection = new RTCPeerConnection(iceServers);

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate != null) {
                signal_user({
                    to: socket,
                    ice: event.candidate
                })
            }
        };

        if (isHost === true) {
            this.isHost = isHost;
            this.peerConnection.ondatachannel = event => {
                console.log("open data channel");
                this.dataChannel = event.channel;
                this.setupDataChannel();
            }
        } else if (isHost === false) {
            this.isHost = isHost;
            this.peerConnection.onnegotiationneeded = async () => {

                const offer = await this.peerConnection.createOffer();
                await this.localDescCreated(offer);
            };

            this.dataChannel = this.peerConnection.createDataChannel("channel");
            this.setupDataChannel();
        }

    }

    setupDataChannel() {
        console.log('WebRTC channel state is:', this.dataChannel.readyState);
        this.dataChannel.onopen = handle_open(this.dataChannel, this.isHost);
        this.dataChannel.onclose = handle_close(this.dataChannel);
        this.dataChannel.onmessage = receive_message;
    }

    async localDescCreated(desc) {
        await this.peerConnection.setLocalDescription(desc);
        signal_user({
            to: this.socket,
            sdp: this.peerConnection.localDescription,
        });
    };

    async handle_signal(data) {
        if (this.peerConnection == null || data.from == null) return;

        if (data.ice) {
            this.peerConnection.addIceCandidate(new RTCIceCandidate(data.ice));
        } else if (data.sdp) {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
            if (this.peerConnection.remoteDescription.type === "offer") {
                const offer = await this.peerConnection.createAnswer()
                await this.localDescCreated(offer);
            }
        }
    }

    //assumes message is already a string
    send(message) {
        if (this.dataChannel == null || this.dataChannel.readyState !== "open") return;
        this.dataChannel.send(message);
    }
}