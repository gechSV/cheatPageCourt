const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")

// Подключение модели базы данных
const DB = require('../DataBase/modelDB.js')
const ContrAuth = require('../controller/auth.js')


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../controller/authJwtMiddleware.js')

var cookieParser = require('cookie-parser')

router.use(express.static('public'))
router.use(bodyParser.json())
router.use(cookieParser())


// Главная страница 
router.get('/', function(req, res, next){ 
    var c = DB.getAllCards().then((x) =>{
        //console.log(x)
        res.render('main.pug', {card: JSON.parse(JSON.stringify(x))})
    })
})

// Страница администрирования 
router.get('/admin', authMiddleware, function(req, res){
    res.render('adminMain.pug')
})

// Страница авторизации администратора
router.get('/auth', function(req, res){
    res.render('adminAuth.pug')
})

// Метод обработки данных при авторизации
router.post('/auth', function(req, res){
    try{
        // получение данных (логин, пароль) из тела запроса
        const {login, password} = req.body

        DB.checkAdmin(login).then((admin) =>{
            // Проверяем существование логина
            if(!admin){
                return res.status(401).json({message: 'login error', code: 2})
            }

            DB.getHashAdminPas(login).then((pas) => {

                const validPassword = bcrypt.compareSync(password, pas.password)
                
                // Проверка корректности пароля
                if(!validPassword) {
                    return res.status(401).json({message: 'Password error', code: 2})
                }
                
                DB.getAdminIdLogin(login).then((data) => {
                    // генерируем токен авторизации и передаём его в клиентскую часть
                    const tokenAuth = ContrAuth.generateAccessToken(login.id, login.login)

                    return res.json({token: tokenAuth})
                })

            })

        })
    } catch(e){
        console.log(e)
        res.status(400).json({message: 'Auth error'})
    }
    
})

module.exports = router;