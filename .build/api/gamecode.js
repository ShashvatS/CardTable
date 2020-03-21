"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var storegamecode_1 = require("../logic/storegamecode");
var router = express.Router();
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
        var gameId = storegamecode_1.newGameCode(socketId);
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
    var socket = storegamecode_1.getHostSocket(gameCode);
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