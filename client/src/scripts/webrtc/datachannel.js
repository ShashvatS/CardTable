
function checkDataChannelState(dataChannel) {
    return () => {
        console.log('WebRTC channel state is:', dataChannel.readyState);
    }
}

export function handle_open(dataChannel, _isHost) {
    return checkDataChannelState(dataChannel);
}

export function handle_close(dataChannel, _isHost) {
    return checkDataChannelState(dataChannel);
}