let proto = require('./app'); // runs initial get all app methods code
let mixin = require('merge-descriptors');

// get app when calling express function after importing
const createApp = () => {
    const app = (req, res, next) => {
        app.handle(req, res, next);
    }

    mixin(app, proto, false);

    app.init();
    return app;
}

exports = module.exports = createApp;