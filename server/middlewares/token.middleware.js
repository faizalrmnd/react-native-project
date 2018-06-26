const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

module.exports = {
    verifyToken (req, res, next) {
        try {
            let decoded = jwt.verify(req.headers.token, secret)
            req.decoded = decoded
            next()
        } catch (err) {
           next(err)
        }
    }
}