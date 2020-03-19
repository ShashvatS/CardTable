import twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

//handle signaling protocol for webrtc connections
export function signaling_protocol(io: SocketIO.Server) {
    io.on('connection', (socket: SocketIO.Socket) => {
        socket.on("get-id", (_ignore) => {
            socket.emit("get-id", {
                id: socket.id
            });
        });

        socket.on("request-access-token", (_ignore) => {
            //TODO: limit how many tokens they can create
            //this can be done by adding captchas into the process later on
            client.tokens.create().then(token => {
                socket.emit("request-access-token", token);
            });
        });

        socket.on("call-user", (data) => {
            if (!data || data.to == null || data.offer == null) return;

            socket.to(data.to).emit("call-made", {
                offer: data.offer,
                from: socket.id
            });
        });
    });
}