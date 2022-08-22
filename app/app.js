const express = require('express')// Подключение фреймворка
const { DOUBLE } = require('sequelize')  

const config = require('./config.json')// JSON-файл конфигурации

var indexRouter = require('./routes/index')
const app = express()

// Подключение модулей
app.set('view engine', 'pug')//  -Шаблонизатор pug

// Настройка сервера
const host = config.ServerCfg.host
const port = config.ServerCfg.port 

app.listen(port, host, function(){
    return console.log('\033[95mServer listens \033[96m'+`http://${host}:${port}` + '\033[0m')
})


app.use('/', indexRouter)

app.use('/auth', indexRouter)

app.use('/admin', indexRouter)

















    // TODO: сделать log.txt

   // DB.syncModel()
    // DB.addArticleItem("Пункт 3 статьи 61 Закона о банкротстве", 'http://www.consultant.ru/document/cons_doc_LAW_39331/216dee87f8e2fe375349d69c1b0f0851a6a65a6d/')
    // DB.addArticleItem('Пункт 3 статьи статьи 228 Закона о банкротстве', 'http://www.consultant.ru/document/cons_doc_LAW_39331/cb6756b4da27b99c48083fb9c9730f5882d73309/')
    // DB.addManyCardHasManyArticlesItem(1, 1)
    // DB.addManyCardHasManyArticlesItem(2, 2)

    // DB.addTableCategoryItem('Сроки подачи и рассмотрения апелляционных жалоб на определения арбитражного суда, принятые по делам о банкротстве', '')
    // DB.addTableCategoryItem('Сроки подачи и рассмотрения апелляционной жалобы на определения арбитражного суда первой инстанции', '')
    // DB.addTableCategoryItem('Сроки обжалования судебных актов', '')
    // DB.addCardItem('Определение об истребовании доказательств, принятое по результатам рассмотрения ходатайства конкурсного  (финансового) управляющего в целях реализации его прав предусмотренных абзацем пункта 2 статьи 126 и абзацем вторым пункта 9 статьи 213.9 Закон о банкротстве, если судом первой инстанции выбран процессуальный вариант истребования доказательств исключено в порядке статьи 66 АПК РФ', 
    // 0, '14 дней', '14 дней', 'Только в апелляционном порядке')
    // DB.addCardItem('О прекращении упрощенной процедуры банкротства и переходе к общей процедуре банкротства либо об отказе в этом', 
    // 0, '14 дней только в апелляции', '14 дней', 'NULL')
    // DB.addCardItem('О временном ограничении права на выезд гражданина из Российской Федерации',
    // 0, '14 дней только в апелляции', '14 дней', 'NULL')

    // DB.addManyCardHasManyArticlesItem(1, 1)
    // DB.addManyCardHasManyArticlesItem(1, 2)
    // DB.addManyCardHasManyArticlesItem(2, 1)
    // DB.addManyCardHasManyArticlesItem(2, 2)
    
    