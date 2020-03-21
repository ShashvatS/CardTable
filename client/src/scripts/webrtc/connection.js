import { signal_user } from "../socketconnection";
import adapter from 'webrtc-adapter';

console.log(adapter.browserDetails);

//TODO: deal with nulls and other errors that might happen
export class RTCConnection {
    constructor() {
        this.socket = null;
        this.peerConnection = null;
        this.dataChannel = null;
    }

    start(iceServers, socket, isHost) {
        if (socket != null) this.socket = socket;

        this.peerConnection = new RTCPeerConnection(iceServers);

        this.peerConnection.onicecandidate = (event) => {
            console.log("found ice candidate");
            if (event.candidate != null) {
                signal_user({
                    to: socket,
                    ice: event.candidate
                })
            }
        };

        if (isHost) {
            this.peerConnection.ondatachannel = event => {
                console.log("open data channel");
                this.dataChannel = event.channel;
                this.setupDataChannel();
            }
        } else {
            this.peerConnection.onnegotiationneeded = async () => {
                console.log("negotiation needed");
                const offer = await this.peerConnection.createOffer();
                await this.localDescCreated(offer);
            };

            this.dataChannel = this.peerConnection.createDataChannel("channel");
            this.setupDataChannel();
        }

    }

    setupDataChannel() {
        const check = checkDataChannelState(this.dataChannel);
        check();
        this.dataChannel.onopen = check;
        this.dataChannel.onclose = check;
        this.dataChannel.onmessage = event =>
            insertMessageToDOM(JSON.parse(event.data), false)
    }

    async localDescCreated(desc) {
        await this.peerConnection.setLocalDescription(desc);
        console.log("should signal user now...");
        signal_user({
            to: this.socket,
            sdp: this.peerConnection.localDescription,
        });
    };

    async handle_signal(data) {
        console.log("follower received signal");
        console.log(data);

        if (this.peerConnection == null || data.from == null) return;

        if (data.ice) {
            this.peerConnection.addIceCandidate(new RTCIceCandidate(data.ice));
        } else if (data.sdp) {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
            if (this.peerConnection.remoteDescription.type === "offer") {
                const offer = await this.peerConnection.createAnswer()
                await this.localDescCreated(offer);
            } else {
                console.log("received an answer...");
            }
        }
    }
}

function checkDataChannelState(dataChannel) {
    return () => {
        console.log('WebRTC channel state is:', dataChannel.readyState);
        if (dataChannel.readyState === 'open') {
            insertMessageToDOM({ content: 'WebRTC data channel is now open' });
        }
    }
}

function insertMessageToDOM(options, isFromMe) {
    console.log(options);
    console.log(isFromMe);
}