import express = require('express');

import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');

import path = require("path");

import { v4 as uuid } from 'uuid';

import react from "./routes/react";
import api_gamecode from "./api/gamecode";

export function library_middleware(app: express.Application) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
}

export function set_properties(app: express.Application) {
    app.set('port', process.env.PORT || 5000);

    const env = process.env.NODE_ENV;
    if (env !== "production" && env !== "development") {
        throw Error("process.env.NODE_ENV not set properly");
    }

    app.set('env', process.env.NODE_ENV);
}

export function view_enine(app: express.Application) {
    app.set('views', path.join(__dirname, "..", 'views'));
    app.set('view engine', 'pug');
}

export function redirect_https(app: express.Application) {
    app.enable('trust proxy');

    if (app.get('env') === "production") {
        app.use((req: express.Request, res: express.Response, next) => {
            if (req.header('x-forwarded-proto') !== 'https') {
                res.redirect('https://' + req.header('host') + req.url);
            }
            else next();
        });
    }
}

export const client_id_cookie: string = "clientid";

//set client id cookie before serving any resources
export function set_cookies(app: express.Application) {
    app.get('/*', (req: express.Request, res: express.Response, next) => {
        if (req.cookies.clientid === undefined) {
            res.cookie(client_id_cookie, uuid(), {
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
        }

        next();
    });
}

export function handle_errors(app: express.Application) {
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use((err: any, req, res, next) => {
            res.status(err['status'] || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err: any, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

export function serve_react(app: express.Application) {
    app.use('/', react);
}

export function handle_gamecode_creation(app: express.Application) {
    app.use('/api', api_gamecode);
}