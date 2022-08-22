const config = require('../config.json')// JSON-файл конфигурации 

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(config.safety.PasswordHashSalt)// Соль для хеширования паролей 

const jwt = require('jsonwebtoken')

// Подключение модели базы данных
const DB = require('../DataBase/modelDB.js')


// Controller.registration('', '1q2w3e4r5t6y')
/**
 * Функция регестрации нового админа
 * 
 * @param {*} login 
 * @param {*} password 
 */
function registration(login, password){
    // хеширование пароля
    const hashPassword = bcrypt.hashSync(password, salt)
    // запись новых данных в БД 
    DB.addAdmin(login, hashPassword)
}

/**
 * Функция генерации токена авторизации
 * 
 * @param {*} id
 * @param {*} login 
 * @returns 
 */
const generateAccessToken = (id, login) => {
    const payload = {
        adminId: id,
        login: login
    }
    return jwt.sign(payload, 'Hello', {expiresIn: config.safety.tokenLifetime})
}


exports.registration = registration
exports.generateAccessToken = generateAccessToken
