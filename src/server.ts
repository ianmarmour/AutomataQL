// Required for Typescript and Type-GraphQL
import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import authorResolver from "./resolvers/author/authorResolver";
import postResolver from "./resolvers/post/postResolver";
import { buildSchema } from "type-graphql";

// DynamoDB Setup and Configuration
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// Gotta keep things Async for buildSchema
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [postResolver, authorResolver]
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      // We pass the database connector into our resolvers via the context
      database: ddb
    })
  });

  const { url } = await server.listen(4000);
  console.log(`Server ready at ${url}`);
}

bootstrap();
