const jwt = require('jsonwebtoken');


module.exports = function auth(req, res, next) {
    // Read auth token from request
    const authToken = req.header('x-auth-token')
    if (!authToken) {
        res.status(401).send('Access denied. No auth token provided.')
        return
    }

    jwt.verify(authToken, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            res.status(401).send(err.message)
            return
        }

        // Decode provided token
        // generateAuthToken always should use IAuthTokenPayload to create payload so this typing should be save
        const decodedPayload = decoded

        // Forward decoded user in request
        req.user = decodedPayload
        next()
    })
}
