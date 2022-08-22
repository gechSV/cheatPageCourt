const jwt = require('jsonwebtoken')

const config = require('../config.json')

module.exports = function(req, res, next){

    if (req.method === 'OPTIONS'){
        next()
    }

    try {
        // const token = req.headers.authorization.split(' ')[1]
        const token = (req.cookies.Authorization)

        if(!token){
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }

        const decodedData = jwt.verify(token, config.safety.JWTKey)

        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'Ошибка авторизации'})
    }
}