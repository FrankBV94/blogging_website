import buildSchema from "graphql"
import { db } from "../config/db_connection.js";

export const typeDef = `
extend type Query {
  blog(blog_id: Int!): Blog
  allBlogs: [Blog]!
}

type Blog {
  blog_id: String!
  title: String!
  banner: String
  des: String
  content: [String]
  tags: [String]
  author: Int!
  total_likes: Int
  total_comments: Int
  total_reads: Int
  total_parent_comments: Int
  comments: [Int]
  draft: Boolean
}
`

export const resolvers = {
  Query: {
    async blog(blog_id) {
      const blog = `SELECT * FROM blog WHERE blog_id=$1`

      return await db.one(blog, blog_id).then(res => res).catch(error, error)
    },
    async allBlogs(_, __, context) {
      return await db.query(`SELECT * FROM blog`).then(res => res).catch(error, error)
    }
  },
};