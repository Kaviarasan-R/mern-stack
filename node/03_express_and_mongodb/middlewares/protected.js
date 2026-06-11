import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);

    const token = authHeader.split('Bearer ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if(err) {
                console.error(err)
                res.status(401).send({ message: err.message })
            }

            req.user = decoded;
        }
    )

    next()
}

export default verifyToken