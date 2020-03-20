"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var gamecodesocket_1 = require("../gamecodesocket");
var router = express.Router();
function randomString(length) {
    var str = '';
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i)
        str += chars[Math.floor(Math.random() * chars.length)];
    return str;
}
router.post('/host', function (req, res) {
    if (req.body == null) {
        res.json({
            success: false,
            reason: "no request body"
        });
    }
    var socketId = req.body.socketId;
    if (socketId == null) {
        res.json({
            success: false,
            reason: "did not supply socketId"
        });
    }
    else {
        var gameId = randomString(10);
        gamecodesocket_1.addGameCode(gameId, socketId);
        res.json({
            success: true,
            gameCode: gameId
        });
    }
});
router.post('/join', function (req, res) {
    if (req.body == null) {
        res.json({
            success: false,
            reason: "no request body"
        });
    }
    var gameCode = req.body.gameCode;
    if (gameCode == null) {
        res.json({
            success: false,
            reason: "did not supply gameCode"
        });
    }
    var socket = gamecodesocket_1.getSocket(gameCode);
    if (socket == null) {
        res.json({
            success: false,
            reason: "invalid gamecode / gamecode not found"
        });
    }
    res.json({
        success: true,
        socket: socket
    });
});
exports.default = router;
//# sourceMappingURL=gamecode.js.map