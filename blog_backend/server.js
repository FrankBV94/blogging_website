import express, { json } from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers/resolver.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';
import 'dotenv/config.js'
/** Config */
const corsOptions = require("./config/cors_option.js");
/** Custom Middlewares */
const { logger } = require("./middlewares/log_events.js");
const credentials = require("./middlewares/credentials.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.SERVER_PORT || 5050;
const app = express();

// Middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

const typeDefs = gql(
  readFileSync(resolve(__dirname, "/shcemas/", "schema.graphql"), {
    encoding: "utf-8",
  })
);

const schema = buildSubgraphSchema({ typeDefs, resolvers });
const server = new ApolloServer({
  schema,
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Routes
app.use("/record", records);
// Specify the path to mount the server
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server),
);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});