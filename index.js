const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const schema = require('./schema')
const { Article, Comment, seq } = require('./database')


var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: { seq }
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
