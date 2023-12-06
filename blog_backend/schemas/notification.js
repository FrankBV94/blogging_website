import buildSchema from "graphql"

export const typeDef = `
extend type Query {
  notification(notification_id: Int!): Notification
  allnotifications: [Notification]!
}

type Notification {
  type: NotificationType!
  blog: Int!
  notification_for: Int!
  user: Int!
  notification: Int
  reply: Int
  replied_on_notification: Int
  seen: Boolean
}

enum NotificationType {
  LIKE
  notification
  REPLY
}
`

export const resolvers = {
  Query: {
    async notification(notification_id) {
      const notification = `SELECT * FROM notification WHERE notification_id=$1`

      return await db.one(notification, notification_id).then(res => res).catch(error, error)
    },
    async allnotifications(_, __, context) {
      return await db.query(`SELECT * FROM notification`).then(res => res).catch(error, error)
    }
  },
};