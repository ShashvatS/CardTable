import twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

//handle signaling protocol for webrtc connections
export function signaling_protocol(io: SocketIO.Server) {
    io.on('connection', (socket: SocketIO.Socket) => {
        socket.on("request-access-token", (_ignore) => {
            //TODO: limit how many tokens they can create
            //this can be done by adding captchas into the process later on
            client.tokens.create().then(token => {
                socket.emit("request-access-token", token);
            });
        });

        socket.on("signal-user", (data) => {
            if (!data || data.to == null) return;
            let to = data.to;
            delete data.to;
            data.from = socket.id;

            //TODO: delete later
            console.log("signaling user");
            console.log(data);

            io.to(to).emit("signal-from-user", data);
        });
    });
}