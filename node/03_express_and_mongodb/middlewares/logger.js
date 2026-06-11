function logger(req, res, next) {
    console.log("Logger...")
    req.logger = "Middleware"
    next()
}

export default logger;