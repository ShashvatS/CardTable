"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twilio = require("twilio");
var client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
//handle signaling protocol for webrtc connections
function signaling_protocol(io) {
    io.on('connection', function (socket) {
        socket.on("get-id", function (_ignore) {
            socket.emit("get-id", {
                id: socket.id
            });
        });
        socket.on("request-access-token", function (_ignore) {
            //TODO: limit how many tokens they can create
            //this can be done by adding captchas into the process later on
            client.tokens.create().then(function (token) {
                socket.emit("request-access-token", token);
            });
        });
        socket.on("call-user", function (data) {
            if (!data || data.to == null || data.offer == null)
                return;
            socket.to(data.to).emit("call-made", {
                offer: data.offer,
                from: socket.id
            });
        });
    });
}
exports.signaling_protocol = signaling_protocol;
//# sourceMappingURL=signal.js.map