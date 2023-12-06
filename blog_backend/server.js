import express, { json } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config.js'
/** GraphQL */
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { executableSchema } from "./schemas/schema.js";
/** Config */
import { corsOptions } from "./config/cors_option.js"
/** Custom Middlewares */
import { logger } from "./middlewares/log_events.js"
import { credentials } from "./middlewares/credentials.js"

const PORT = process.env.SERVER_PORT || 5050;
const app = express();

// Middlewares
/* app.use(credentials);
app.use(logger); */
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

const server = new ApolloServer({
  schema: executableSchema
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path to mount the server
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server),
);

// Start the Express server
app.listen(PORT, () => {
  console.log(`${process.env.SERVER_NAME} en puerto ${process.env.SERVER_PORT}`)
});