import pkg from 'lodash';
import { buildSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDef as Blog, resolvers as blogResolvers } from './blog.js';
import { typeDef as Comment, resolvers as commentResolvers } from './comment.js';
import { typeDef as Notification, resolvers as notificationResolvers } from './notification.js';
import { typeDef as User, resolvers as userResolvers } from './user.js';

const { merge } = pkg

const Query = `
  type Query {
    _empty: String
  }
`

export const executableSchema = makeExecutableSchema({
  typeDefs: [Query, Blog, Comment, Notification, User],
  resolvers: merge(blogResolvers, commentResolvers, notificationResolvers, userResolvers),
});