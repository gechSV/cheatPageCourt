// Подключение к БД
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('cheat_page_court_db', 'root', 'abobaVada2022', {
    host: 'localhost',
    dialect: 'mysql'
})  


// Модель карточки данных
const Card = sequelize.define(
  'Card', 
  {
    // Судебный акт
    JudicialAct:{
      type: Sequelize.TEXT
    },
    // Пошлина
    Duty:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    }, 
    // Срок обжалования 
    AppealPeriod:{
      type: Sequelize.STRING
    },
    // Срок рассмотрения
    ReviewPeriod:{
      type: Sequelize.STRING
    },
    // Примечания
    Notes:{
      type: Sequelize.TEXT
    }
  }
)

// Модель статьи
const Article = sequelize.define(
  'Article',
  {
    // Название статьи/номер
    Name:{
      type: Sequelize.TEXT
    },
    // Ссылка на сторонний ресурс
    Link:{
      type: Sequelize.TEXT
    }
  }
)

// Для связи многоие ко многим. Связь карточек данных и статей
const many_Card_has_many_Articles = sequelize.define(
  'many_card_has_many_articles',
  {}
)

// Установка внешних ключей для 'many_Card_has_many_Articles'
Card.hasMany(many_Card_has_many_Articles)
Article.hasMany(many_Card_has_many_Articles)

/**
 * Синхронизация моделей ORM и таблиц БД 
 */
function syncModel(){
  sequelize.sync().then(result=>{
    console.log('\033[95mМодели и таблицы БД синхронизированны.\033[0m')
    // console.log(result);
  })
  .catch(err=> console.log(err));
}

/**
 * Добавление строк в таблицу Card
 * 
 * @param {*} act Судебный акт
 * @param {*} duty Пошлина 
 * @param {*} appealPer Срок обжалования 
 * @param {*} reviewPer Срок рассмотрения
 * @param {*} notes Примечания
 */
function addCardItem(act, duty, appealPer, reviewPer, notes){
  Card.create({
    JudicialAct: act,
    Duty: duty, 
    AppealPeriod: appealPer,
    ReviewPeriod: reviewPer,
    Notes: notes
  }).then(result=>{
    const card = {act:result.JudicialAct, duty:result.Duty, appealPer:result.AppealPeriod,
                  reviewPer:result.ReviewPeriod,notes:result.Notes}
    console.log('\033[92m' + card + '\033[0m')//TODO: Починить вывод
  }).catch(err=>console.log(err));
}



exports.syncModel = syncModel
exports.addCardItem = addCardItem