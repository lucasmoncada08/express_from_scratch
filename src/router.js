/*
A one per application prototype of router to handle the routing logic
*/

let setPrototypeOf = require('setprototypeof')
let Route = require('./route')
let Layer = require('./layer')

// extending prototype of router to proto
let proto = module.exports = (options) => {
    let opts = options || {}

    const router = (req, res, next) => {
        router.handle(req, res, next)
    }

    setPrototypeOf(router, proto)

    router.params = {}
    router._params = []
    router.caseSensitive = opts.caseSensitive
    router.mergeParams = opts.mergeParams
    router.strict = opt.strict
    router.stack = []

    return router
}

proto.route = function route(path) {
    let route = new Route(path) 
    let layer = new Layer(path, {}, route.dispatch.bind(route)) // implement

    layer.route = route
    
    this.stack.push(layer)

    return route
}

proto.handle = function handle(req, res, out) {
    let self = this
    let stack = self.stack
    let layer = stack[0]
    let route = layer.route
    route.stack[0].handle_request(req, res)
}