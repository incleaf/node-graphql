const Sequelize = require('sequelize')
const seq = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Article = seq.define('articles', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  author: Sequelize.STRING,
  title: Sequelize.STRING,
  content: Sequelize.STRING,
})

const Comment = seq.define('comments', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  author: Sequelize.STRING,
  content: Sequelize.STRING,
})

Article.hasMany(Comment, { foreignKey: 'articleId' })
Article.sync({ force: true })
Comment.sync({ force: true }).then(() => {
  generateDummyData()
})

function generateDummyData() {
  Article.create({
    author: 'adfs',
    title: 'asdfdas',
    content: '134432314234121432'
  })
  Comment.create({
    author: 'leejadues',
    content: '23443124312',
    articleId: 1,
  })
  Comment.create({
    author: 'leejadues',
    content: '23443124312',
    articleId: 1,
  })

  Comment.create({
    author: 'leejadues',
    content: '23443124312',
    articleId: 1,
  })
  Comment.create({
    author: 'leejadues',
    content: '23443124312',
    articleId: 1,
  })
}

module.exports = { seq, Article, Comment }
