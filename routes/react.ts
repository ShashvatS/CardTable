import express = require('express');

import path = require('path');

const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

router.get('/', (req, res) => {
    res.redirect('index.html');
});

export default router;
