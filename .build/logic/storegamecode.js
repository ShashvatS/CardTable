"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomString(length) {
    var str = '';
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i)
        str += chars[Math.floor(Math.random() * chars.length)];
    return str;
}
var game2socket = {};
/**
 * creates a game code given socket id and also stores it */
function newGameCode(socket_id) {
    var gameCode = randomString(10);
    game2socket[gameCode] = socket_id;
    return gameCode;
}
exports.newGameCode = newGameCode;
function getHostSocket(game) {
    return game2socket[game];
}
exports.getHostSocket = getHostSocket;
//# sourceMappingURL=storegamecode.js.map