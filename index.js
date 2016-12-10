const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const database = require('./database')


// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)

var schema = require('./schema')


var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: { database }
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
