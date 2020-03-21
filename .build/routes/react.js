"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var router = express.Router();
router.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
router.get('/', function (req, res) {
    res.redirect('index.html');
});
exports.default = router;
//# sourceMappingURL=react.js.map