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
} = require('graphql');


const Article = new GraphQLObjectType({
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

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    article: {
      type: Article,
      description: 'Article',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: ({ database }, { id }) => {
        const article = database.articles.find(v => v.id === Number(id))

        if (!article) {
          return 'Article can not be found'
        }

        return article
      }
    },
    articles: {
      type: new GraphQLList(Article),
      description: 'Articles',
      resolve: ({ database }) => database.articles,
    }
  })
});

const myTestSchema = new GraphQLSchema({
  query: Query,
  // mutation: TestMutationType,
  // subscription: TestSubscriptionType
});

module.exports = myTestSchema;
