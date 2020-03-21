"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//handle signaling protocol for webrtc connections
function signaling_protocol(io) {
    io.on('connection', function (socket) {
        socket.on("signal-user", function (data) {
            if (!data || data.to == null)
                return;
            var to = data.to;
            delete data.to;
            data.from = socket.id;
            io.to(to).emit("signal-from-user", data);
        });
    });
}
exports.signaling_protocol = signaling_protocol;
//# sourceMappingURL=signal.js.map