const Sequelize = require('sequelize')
const seq = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Article = seq.define('articles', {
  author: Sequelize.STRING,
  title: Sequelize.STRING,
  content: Sequelize.STRING,
})

const Comment = seq.define('comments', {
  author: Sequelize.STRING,
  content: Sequelize.STRING,
})

Article.Comments = Article.hasMany(Comment, { foreignKey: 'articleId' })

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
  Article.create({
    author: 'hyeonsu',
    title: 'hi i am hyeonsu',
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
  Comment.create({
    author: 'anonymous',
    content: 'hey!',
    articleId: 2,
  })
}

module.exports = { seq, Article, Comment }
