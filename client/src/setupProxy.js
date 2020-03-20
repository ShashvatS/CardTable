const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy.createProxyMiddleware('/api',
        {
            target: 'http://localhost:5000/',
        }
    ));

    app.use(proxy.createProxyMiddleware('/socket.io',
        {
            target: 'http://localhost:5000/',
            ws: true
        }));

    // app.use(proxy.createProxyMiddleware('/peerjs',
    //     {
    //         target: 'http://localhost:5000/',
    //         ws: true
    //     }
    // ));


}