import express = require('express');
import { newGameCode, getHostSocket } from '../logic/storegamecode';

const router = express.Router();

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
        const gameId: string = newGameCode(socketId);

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

    const socket = getHostSocket(gameCode);
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