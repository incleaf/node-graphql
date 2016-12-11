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
const {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require('graphql-relay');
const { Article, Comment } = require('./database')
const { resolver, attributeFields, defaultArgs } = require('graphql-sequelize')


const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Article') {
      return Article.findById(id);
    } else if (type === 'Comment') {
      return Comment.findById(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Article.Instance) {
      return ArticleType;
    } else if (obj instanceof Comment.Instance) {
      return CommentType;
    } else {
      return null;
    }
  }
);

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: globalIdField('Article'),
    author: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
})
// const ArticleInputType = new GraphQLInputObjectType({
//   name: 'ArticleInput',
//   fields: () => ({
//     author: { type: GraphQLString },
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//   }),
// })

// const {
//   connectionType: articleConnection,
//   edgeType: ArticleEdge,
// } = connectionDefinitions({ name: 'Article', nodeType: ArticleType })

// const CommentType = new GraphQLObjectType({
//   name: 'Comment',
//   fields: () => ({
//     id: { type: globalIdField('Comment') },
//     author: { type: GraphQLString },
//     content: { type: GraphQLString },
//   }),
//   interface: [nodeInterface],
// })
// const CommentInputType = new GraphQLInputObjectType({
//   name: 'CommentInput',
//   fields: () => ({
//     author: { type: GraphQLString },
//     content: { type: GraphQLString },
//   }),
// })

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    article: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (root, { id }) => {
        console.log(id)
        return Article.findById(id).then(instance => instance.get({ pure: true }));
      }
    },
    // articles: {
    //   type: articleConnection,
    //   args: connectionArgs,
    //   resolve: (root, args) => connectionFromArray(Article.findAll(), args),
    // },
    // comment: {
    //   type: CommentType,
    //   args: defaultArgs(Comment),
    //   resolve: (root, { id }) => Comment.findById(id),
    // },
    // comments: {
    //   type: new GraphQLList(CommentType),
    //   args: Object.assign({}, defaultArgs(Comment), {
    //     articleId: { type: GraphQLID },
    //   }),
    //   resolve: (root, { articleId }) => Comment.findAll(articleId ? { where: { articleId } } : {}),
    // },
    node: nodeField,
  }),
})

// const RootMutationType = new GraphQLObjectType({
//   name: 'RootMutation',
//   fields: {
//     writeArticle: {
//       type: ArticleType,
//       args: {
//         article: { type: ArticleInputType }
//       },
//       resolve: (root, { article }) => {
//         return Article.create(article)
//       }
//     },
//     updateArticle: {
//       type: ArticleType,
//       args: {
//         id: { type: GraphQLID },
//         article: { type: ArticleInputType },
//       },
//       resolve: (root, { id, article }) => {
//         return Article.findById(id).then(instance => instance.update(article))
//       },
//     },
//     deleteArticle: {
//       type: ArticleType,
//       args: {
//         id: { type: GraphQLID },
//       },
//       resolve: (root, { id }) => Article.findById(id).then(instance => instance.destroy()),
//     },
//     createComment: {
//       type: CommentType,
//       args: {
//         comment: { type: CommentInputType },
//         articleId: { type: GraphQLID },
//       },
//       resolve: (root, { comment, articleId }) => Comment.create(Object.assign({}, comment, { articleId }))
//     },
//     updateComment: {
//       type: CommentType,
//       args: {
//         id: { type: GraphQLID },
//         comment: { type: CommentInputType },
//       },
//       resolve: (root, { id, comment }) => Comment.findById(id).then(instance => instance.update(comment)),
//     },
//     deleteComment: {
//       type: CommentType,
//       args: {
//         id: { type: GraphQLID },
//       },
//       resolve: (root, { id }) => Comment.findById(id).then(instance => instance.destory()),
//     }
//   }
// })

const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: RootMutationType,
  // subscription: TestSubscriptionType
})

module.exports = rootSchema
