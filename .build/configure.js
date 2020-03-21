"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var uuid_1 = require("uuid");
var react_1 = require("./routes/react");
var gamecode_1 = require("./api/gamecode");
var iceservers_1 = require("./api/iceservers");
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
function view_enine(app) {
    app.set('views', path.join(__dirname, "..", 'views'));
    app.set('view engine', 'pug');
}
exports.view_enine = view_enine;
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
exports.client_id_cookie = "clientid";
//set client id cookie before serving any resources
function set_cookies(app) {
    app.get('/*', function (req, res, next) {
        if (req.cookies.clientid === undefined) {
            res.cookie(exports.client_id_cookie, uuid_1.v4(), {
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
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
                error: {}
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
function main_apis(app) {
    //handle gamecode creation
    app.use('/api', gamecode_1.default);
    //handle twilio token creation and api requests to get ice servers
    app.use('/api', iceservers_1.default);
}
exports.main_apis = main_apis;
//# sourceMappingURL=configure.js.map