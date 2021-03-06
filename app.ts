require('dotenv').config();

import express = require('express');

import http = require('http');
import sio = require('socket.io');

import { library_middleware, set_properties, redirect_https, set_cookies, handle_errors, serve_react, main_apis, view_enine } from './configure';
import { signaling_protocol } from "./api/signal";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io: SocketIO.Server = sio(server);

library_middleware(app);
set_properties(app);
view_enine(app);
redirect_https(app);
set_cookies(app);
main_apis(app);
serve_react(app);
handle_errors(app);

signaling_protocol(io);

server.listen(app.get('port'), () => {
    console.log('Express server listening on port ', server.address());
});
