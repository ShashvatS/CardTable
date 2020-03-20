"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game2socket = {};
function addGameCode(gameCode, socket) {
    game2socket[gameCode] = socket;
}
exports.addGameCode = addGameCode;
function getSocket(gameCode) {
    if (gameCode in game2socket && game2socket[gameCode] != null) {
        return game2socket[gameCode];
    }
}
exports.getSocket = getSocket;
//# sourceMappingURL=gamecodesocket.js.map