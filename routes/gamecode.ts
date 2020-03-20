import express = require('express');
import { addGameCode, getSocket } from '../gamecodesocket';

const router = express.Router();

function randomString(length: number): string {
    var str: string = '';
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i) str += chars[Math.floor(Math.random() * chars.length)];
    return str;
}

router.post('/host', (req: express.Request, res: express.Response) => {
    if (req.body == null) {
        res.json({
            success: false,
            reason: "no request body"
        });
    }

    const socketId = req.body.socketId;
    if (socketId == null) {
        res.json({
            success: false,
            reason: "did not supply socketId"
        });
    }

    else {
        const gameId: string = randomString(10);

        addGameCode(gameId, socketId);

        res.json({
            success: true,
            gameCode: gameId
        });
    }
});

router.post('/join', (req: express.Request, res: express.Response) => {
    if (req.body == null) {
        res.json({
            success: false,
            reason: "no request body"
        });
    }

    const gameCode = req.body.gameCode;
    if (gameCode == null) {
        res.json({
            success: false,
            reason: "did not supply gameCode"
        });
    }

    const socket = getSocket(gameCode);
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

export default router;