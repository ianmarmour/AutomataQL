const { ApolloServer, gql } = require("apollo-server");
import schema from "./schema";

// DynamoDB Setup and Configuration
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    // We pass the database connector into our resolvers via the context
    database: ddb
  })
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
