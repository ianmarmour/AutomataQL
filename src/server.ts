// Required for Typescript and Type-GraphQL
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import authorResolver from "./resolvers/author/authorResolver";
import postResolver from "./resolvers/post/postResolver";
import { buildSchema } from "type-graphql";
import cors from "cors";
import cookieparser from "cookie-parser";
import cognitoMiddleware from "cognito-express";

// DynamoDB Setup and Configuration
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const cognitoApolloMiddleware = new cognitoMiddleware({
  region: "us-west-2",
  cognitoUserPoolId: "us-west-2_HQQi20xli",
  tokenUse: "access", //Possible Values: access | id
  tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

//Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
const authenticateUser = function(req, res, next) {
  let accessTokenFromClient;

  // Parse out the accessToken
  for (let cookie in req.cookies) {
    if (cookie.includes("accessToken")) {
      accessTokenFromClient = req.cookies[cookie];
    }
  }

  //Fail if token not present in header.
  if (!accessTokenFromClient)
    return res.status(401).send("Access Token missing from header");

  cognitoApolloMiddleware.validate(accessTokenFromClient, function(
    err,
    response
  ) {
    //If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send(err);

    //Else API has been authenticated. Proceed.
    res.locals.user = response;
    next();
  });
};

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

  // Setup Express and Apply Cognito Authentication
  const app = express();
  app.use(
    cookieparser(),
    cors({
      origin: "http://localhost:8080",
      credentials: true
    }),
    authenticateUser
  );

  // Apply our express middleware to our Apollo Server
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

bootstrap();
