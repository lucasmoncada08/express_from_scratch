/*
Hold information for the routes and layers, including the handlers for a given path
*/

let methods = require('methods')
let flatten = require('array-flatten')
let Layer = require('./layer')

// initialize the Route object
function Route(path) {
    this.path = path
    this.stack = []

    this.methods = {}
}

Route.prototype.dispatch = (req, res, done) => {}

methods.forEach(function (method) {
    Route.prototype[method] = function() {
        let handles = flatten(Array.prototype.slice.call(arguments))

        for (let i=0; i < handles.length; i++) {
            let handle = handles[i]

            if (typeof handle !== "function") {
                let type = toString.call(handle)
                let message = "Route." + method + "() requires a callback function, but got a " + type
                throw new Error(message)
            }

            let layer = Layer("/", {}, handle)
            layer.method = method

            this.methods[method] = true
            this.stack.push(layer)
        }

        return this
    }
})

module.exports = Route