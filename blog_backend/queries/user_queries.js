import { db } from "../config/db_connection.js"
import { GraphQLObjectType, GraphQLID } from "graphql"
import { UserType } from "../schemas/user.js"

export const UserQuery = new GraphQLObjectType({
  name: "UserQueryType",
  type: "Query",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE id=$1`;
        const values = [args.id];
        try {
          const res = await db.one(query, values);
          return res;
        } catch (err) {
          return err;
        }
      }
    }
  }
});