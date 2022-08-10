
// Подключение к БД
const { Promise } = require('sequelize')
const { Sequelize, json } = require('sequelize')

const sequelize = new Sequelize('cheat_page_court_db', 'root', 'abobaVada2022', {
    host: 'localhost',
    dialect: 'mysql'
})  


//Модель категориий таблиц
const TableCategory = sequelize.define(
  'TableCategory',
  {
    // Название таблицы
    Name:{
      type: Sequelize.STRING
    },
    // Описание
    Descriptions:{
      type: Sequelize.TEXT
    }
  }
)


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

// Установка связи между таблицей TableCategory & Card
TableCategory.hasMany(Card)

/**
 * Синхронизация моделей ORM и таблиц БД
 */
 function syncModel(){

  sequelize.sync(/*{force: true}*/).then(result=>{
    new Date();
    console.log('11   '+Date.now())
    console.log('\033[95mМодели и таблицы БД синхронизированны.\033[0m')
    // console.log(result);
    return
  })
  .catch(err=> console.log(err));
}

//
//####### Добавление данных ####### 
//

/**
 * Добавление строк в таблицу TableCategory
 * 
 * @param {*} name Название категории 
 * @param {*} description Примечания
 */
function addTableCategoryItem(name, description){
  TableCategory.create({
    Name: name,
    Descriptions: description
  }).then(res=>{
    console.log('\033[92mВ таблтцу \'TableCategory\' добавлена запись\033[0m')
    console.log(res.dataValues)
  }).catch(err=>console.log(err))
}

/**
 * Добавление строк в таблицу Card
 * 
 * @param {*} act Судебный акт
 * @param {*} duty Пошлина 
 * @param {*} appealPer Срок обжалования 
 * @param {*} reviewPer Срок рассмотрения
 * @param {*} notes Примечания
 * @param {*} tableCategoryId id категории таблицы
 */
function addCardItem(act, duty, appealPer, reviewPer, notes, tableCategoryId){
    Card.create({
      JudicialAct: act,
      Duty: duty, 
      AppealPeriod: appealPer,
      ReviewPeriod: reviewPer,
      Notes: notes,
      TableCategoryId: tableCategoryId
    }).then(res=>{
      console.log('\033[92mВ таблтцу \'Card\' добавлена запись\033[0m')
      console.log(res.dataValues)
    }).catch(err=>console.log(err))
}

/**
 * Добавление строк в таблицу Article
 * 
 * @param {*} name Название статьи  
 * @param {*} link Ссылка на источник
 */
function addArticleItem(name, link){
  new Date();
    console.log('22    ' + Date.now())
  Article.create({
    Name: name, 
    Link: link
  }).then(res=>{
    console.log('\033[92mВ таблтцу \'Article\' добавлена запись\033[0m')
    console.log(res.dataValues)
  }).catch(err=>console.log(err))
}

/**
 * Добавление строк в таблицу many_Card_has_many_Articles
 * 
 * @param {*} cardId id-карточки
 * @param {*} articleId id-статьи
 */
function addManyCardHasManyArticlesItem(cardId, articleId){
  many_Card_has_many_Articles.create({
    CardId: cardId,
    ArticleId: articleId
  }).then(res=>{
    console.log('\033[92mВ таблтцу \'many_card_has_many_articles\' добавлена запись\033[0m')
    console.log(res.dataValues)
  }).catch(err=>console.log(err))
}

//
//####### Запросы данных ####### 
//

function getAllCards(){
  
}






exports.syncModel = syncModel
exports.addTableCategoryItem = addTableCategoryItem
exports.addCardItem = addCardItem
exports.addArticleItem = addArticleItem
exports.addManyCardHasManyArticlesItem = addManyCardHasManyArticlesItem
