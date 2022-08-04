// Подключение фреймворка
const express = require('express');
const app = express();
const { render, redirect } = require('express/lib/response');

app.use(express.static('public'));
// Подключение модулей
//  -Шаблонизатор pug
app.set('view engine', 'pug');

// Настройка сервера
const host = '127.0.0.1';
const port = 8000; 


app.listen(port, host, function(){
    return console.log(`Server listens http://${host}:${port}`)
})

app.get('/', (req, res) => {
    res.render('main.pug');
    console.log('load /');
})

// TODO: сделать log.txt