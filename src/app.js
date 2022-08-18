let methods = require('methods')
let Router = require('')

let slice = Array.prototype.slice // to slice through array-like objects

let app = exports = module.exports = {}

// initializing the app to starting state
app.init = function () {
    this.cache = {}
    this.engines = {}
    this.settings = {}

    this._router = undefined;
}

app.createRouter = function createRouter() {
    if (!this._router)
        this._router = 'router-place-holder' // <TODO>
}

// create each api method for the app object to call
methods.forEach(function (method) {
    app[method] = function (path) {
        this.createRouter()

        let route = this._router.route(path)
        route[method].apply(route, slice.call(arguments, 1))
        return this
    }
})
