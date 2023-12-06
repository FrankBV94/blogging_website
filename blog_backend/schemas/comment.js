import buildSchema from "graphql"

export const typeDef = `
extend type Query {
  comment(comment_id: Int!): Comment
  allComments: [Comment]!
}

type Comment {
  comment_id: Int!
  blog_id: Int!
  comment_author: Int!
  comment: String!
  children: [Int]
  commented_by: Int!
  isReply: Boolean
  parent: Int
  createdAt: String!
}
`

export const resolvers = {
  Query: {
    async comment(comment_id) {
      const comment = `SELECT * FROM comment WHERE comment_id=$1`

      return await db.one(comment, comment_id).then(res => res).catch(error, error)
    },
    async allComments(_, __, context) {
      return await db.query(`SELECT * FROM comment`).then(res => res).catch(error, error)
    }
  },
};

