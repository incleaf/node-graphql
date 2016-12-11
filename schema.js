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
  fields: () => attributeFields(Article),
})
const ArticleInputType = new GraphQLInputObjectType({
  name: 'ArticleInput',
  fields: () => ({
    author: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
})

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => attributeFields(Comment),
})
const CommentInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: () => ({
    author: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
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
      resolve: (root, { articleId }) => Comment.findAll(articleId ? { where: { articleId } } : {}),
    }
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    writeArticle: {
      type: ArticleType,
      args: {
        article: { type: ArticleInputType }
      },
      resolve: (root, { article }) => {
        return Article.create(article)
      }
    },
    updateArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID },
        article: { type: ArticleInputType },
      },
      resolve: (root, { id, article }) => {
        return Article.findById(id).then(instance => instance.update(article))
      },
    },
    deleteArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (root, { id }) => Article.findById(id).then(instance => instance.destroy()),
    },
    createComment: {
      type: CommentType,
      args: {
        comment: { type: CommentInputType },
        articleId: { type: GraphQLID },
      },
      resolve: (root, { comment, articleId }) => Comment.create(Object.assign({}, comment, { articleId }))
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID },
        comment: { type: CommentInputType },
      },
      resolve: (root, { id, comment }) => Comment.findById(id).then(instance => instance.update(comment)),
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (root, { id }) => Comment.findById(id).then(instance => instance.destory()),
    }
  }
})

const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  // subscription: TestSubscriptionType
})

module.exports = rootSchema
