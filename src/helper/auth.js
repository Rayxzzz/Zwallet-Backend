const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const verifyToken = (req, res, next) => {
    let token
    console.log(req.headers.authorization.split(' ')[1])
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]    
    } else{
        next(createError(403, 'Server need Token'))
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT) 
        // console.log('hasil token', decoded)
        req.email = decoded.email
        req.role = decoded.role
    } catch (error) {
        if(error.name === 'JsonWebTokenError'){
            console.log(error)
            return next(createError(403, 'Token invalid'))
        } else if(error.name === 'TokenExpiredError'){
            return next(createError(400, 'Token Expired'))
        } else{
            // console.log(error.name)   
            return next(createError(400, 'Token not active'))
        }
    }
    // console.log(token)
    next()
}

const isAdmin = (req, res, next) => {
    const role = req.role;
    if(role !== 'admin'){
        return next(createError(401, 'this is admin privilage'))
    }
    next()
}

module.exports = {
    verifyToken,
    isAdmin
}