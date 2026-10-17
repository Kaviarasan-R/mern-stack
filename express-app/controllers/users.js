function getResponse(req, res) {
    try {
        console.log(req.user)

        res.status(200).send({ message: "Get all users" })
    } catch (err) {
        throw new Error(err)
    }
}

function putResponse(req, res) {
    res.status(200).send({ message: "Update user" })
}

module.exports = { getResponse, putResponse }