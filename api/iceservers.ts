import twilio = require("twilio");
import express = require('express');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const router = express.Router();

router.post('/iceservers', async (req: express.Request, res: express.Response) => {
        //TODO: limit how many tokens they can create
    //this can be done by adding captchas into the process later on
    const token = await client.tokens.create();

    if (token == null || token.iceServers == null) {
        res.json({
            success: false,
            reason: "token creation failed"
        });
    } else {
        res.json({
            success: true,
            iceServers: token.iceServers
        });
    }
});


export default router;