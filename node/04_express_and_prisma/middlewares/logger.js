function logger(req, res, next) {
    console.log("Hello world")
    next()
}

module.exports = logger;