// Подключение фреймворка
const express = require('express');
const app = express();
// const { render, redirect } = require('express/lib/response');

app.use(express.static('public'));
// Подключение модулей
//  -Шаблонизатор pug
app.set('view engine', 'pug');

// Настройка сервера
const host = '127.0.0.1';
const port = 8000; 


// Подключение модели базы данных
const DB = require('./DataBase/modelDB.js');

app.listen(port, host, function(){
    return console.log('\033[95mServer listens \033[96m'+`http://${host}:${port}` + '\033[0m')
})

app.get('/', (req, res) => {
    res.render('main.pug');
    console.log('\033[95mload /\033[0m');
    //DB.syncModel()
    DB.addCardItem('Акт', 1000, 'Есть', 'Тоже', 'Боба')
})

// TODO: сделать log.txt