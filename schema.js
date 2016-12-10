const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')
const { Article, Comment } = require('./database')


const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'Article',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID field from Article type',
      resolve: (root) => root.id,
    },
    title: {
      type: GraphQLString,
      description: 'Title field from Article type',
      resolve: (root) => root.title,
    },
    content: {
      type: GraphQLString,
      description: 'Content filed from Article type',
      resolve: (root) => root.content,
    },
    author: {
      type: GraphQLString,
      description: 'Author filed from Article type',
      resolve: (root) => root.author,
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    article: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (root, {id}) => Article
        .findById(id)
        .then(article => {
          console.log(article)
          return article
        }),
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: ({ database }) => database.articles,
    }
  }),
});

const rootSchema = new GraphQLSchema({
  query: QueryType,
  // mutation: TestMutationType,
  // subscription: TestSubscriptionType
});

module.exports = rootSchema;
