const jwt = require('jsonwebtoken')

const authorizeUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).send('You shall not pass!')

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).send('Invalid token!')
        req.user = payload
        next()
    })
}

module.exports = authorizeUser