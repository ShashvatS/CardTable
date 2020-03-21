
//handle signaling protocol for webrtc connections
export function signaling_protocol(io: SocketIO.Server) {
    io.on('connection', (socket: SocketIO.Socket) => {
        socket.on("signal-user", (data) => {
            if (!data || data.to == null) return;
            let to = data.to;
            delete data.to;
            data.from = socket.id;

            io.to(to).emit("signal-from-user", data);
        });
    });
}