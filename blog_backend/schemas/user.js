import buildSchema from "graphql"

export const typeDef = `
extend type Query {
  user(user_id: Int!): User
  allusers: [User]!
}

type User {
  user_id: String!
  fullname: String!
  email: String!
  password: String
  username: String
  bio: String
  profile_img: String
  youtube: String
  instagram: String
  facebook: String
  twitter: String
  github: String
  website: String
  total_posts: Int
  total_reads: Int
  google_auth: Boolean
  joinedAt: String
}
`

export const resolvers = {
  Query: {
    async user(user_id) {
      const user = `SELECT * FROM user WHERE user_id=$1`

      return await db.one(user, user_id).then(res => res).catch(error, error)
    },
    async allusers(_, __, context) {
      return await db.query(`SELECT * FROM user`).then(res => res).catch(error, error)
    }
  },
};