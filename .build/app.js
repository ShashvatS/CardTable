"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require("express");
var http = require("http");
var sio = require("socket.io");
var configure_1 = require("./configure");
var signal_1 = require("./api/signal");
var app = express();
var server = http.createServer(app);
var io = sio(server);
configure_1.library_middleware(app);
configure_1.set_properties(app);
configure_1.view_enine(app);
configure_1.redirect_https(app);
configure_1.set_cookies(app);
configure_1.handle_gamecode_creation(app);
configure_1.serve_react(app);
configure_1.handle_errors(app);
signal_1.signaling_protocol(io);
app.get('/api/helloworld', function (req, res) {
    res.json({ hello: "world" });
});
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ', server.address());
});
//# sourceMappingURL=app.js.map