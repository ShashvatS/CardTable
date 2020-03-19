"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var util = require("./util");
var uuid_1 = require("uuid");
var react_1 = require("./routes/react");
function library_middleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
}
exports.library_middleware = library_middleware;
function set_properties(app) {
    app.set('port', process.env.PORT || 5000);
    var env = process.env.NODE_ENV;
    if (env !== "production" && env !== "development") {
        throw Error("process.env.NODE_ENV not set properly");
    }
    app.set('env', process.env.NODE_ENV);
}
exports.set_properties = set_properties;
function redirect_https(app) {
    app.enable('trust proxy');
    if (app.get('env') === "production") {
        app.use(function (req, res, next) {
            if (req.header('x-forwarded-proto') !== 'https') {
                res.redirect('https://' + req.header('host') + req.url);
            }
            else
                next();
        });
    }
}
exports.redirect_https = redirect_https;
//set client id cookie before serving any resources
function set_cookies(app) {
    app.get('/*', function (req, res, next) {
        if (req.cookies.clientid === undefined) {
            res.cookie(util.client_id_cookie, uuid_1.v4());
        }
        next();
    });
}
exports.set_cookies = set_cookies;
function handle_errors(app) {
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err['status'] || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
exports.handle_errors = handle_errors;
function serve_react(app) {
    app.use('/', react_1.default);
}
exports.serve_react = serve_react;
//# sourceMappingURL=configure.js.map