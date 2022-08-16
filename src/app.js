let app = exports = module.exports = {}

// initializing the app to starting state
app.init = () => {
    this.cache = {}
    this.engines = {}
    this.settings = {}

    this._router = undefined;
}
