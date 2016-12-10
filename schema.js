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
const { resolver, attributeFields, defaultArgs } = require('graphql-sequelize')


const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => attributeFields(Article)  // resolve: () => resolver(Article),
})

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => attributeFields(Comment)
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    article: {
      type: ArticleType,
      args: defaultArgs(Article),
      resolve: (root, { id }) => Article.findById(id),
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: () => Article.findAll(),
    },
    comment: {
      type: CommentType,
      args: defaultArgs(Comment),
      resolve: (root, { id }) => Comment.findById(id),
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: Object.assign({}, defaultArgs(Comment), {
        articleId: { type: GraphQLID },
      }),
      resolve: (root, { articleId }) => Comment.findAll({ where: { articleId } }),
    }
  }),
})

const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: TestMutationType,
  // subscription: TestSubscriptionType
})

module.exports = rootSchema
