let methods = require('methods');
let Router = require('./router');
let http = require('http');

let slice = Array.prototype.slice; // to slice through array-like objects

let app = exports = module.exports = {};

// initializing the app to starting state
app.init = function () {
    this.cache = {};
    this.engines = {};
    this.settings = {};

    this._router = undefined;
}

app.createRouter = function createRouter() {
    if (!this._router)
        this._router = Router({});
}

app.listen = function listen() {
    let server = http.createServer(this);
    return server.listen.apply(server, arguments);
}

app.handle = function handle(req, res, out) {
    let router = this._router;
    router.handle(req, res);
}

// create each api method for the app object to call (runs when imported)
methods.forEach(function (method) {
    app[method] = function (path) {
        this.createRouter();

        let route = this._router.route(path);
        route[method].apply(route, slice.call(arguments, 1));
        return this;
    }
})

