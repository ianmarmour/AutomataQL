"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Required for Typescript and Type-GraphQL
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const authorResolver_1 = __importDefault(require("./resolvers/author/authorResolver"));
const postResolver_1 = __importDefault(require("./resolvers/post/postResolver"));
const type_graphql_1 = require("type-graphql");
const cognito_express_1 = __importDefault(require("cognito-express"));
// DynamoDB Setup and Configuration
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const cognitoApolloMiddleware = new cognito_express_1.default({
    region: "us-west-2",
    cognitoUserPoolId: "us-west-2_Q10tI6PtO",
    tokenUse: "access",
    tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});
//Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
const authenticateUser = function (req, res, next) {
    //I'm passing in the access token in header under key accessToken
    let accessTokenFromClient = req.headers.accesstoken;
    //Fail if token not present in header.
    if (!accessTokenFromClient)
        return res.status(401).send("Access Token missing from header");
    cognitoApolloMiddleware.validate(accessTokenFromClient, function (err, response) {
        //If API is not authenticated, Return 401 with error message.
        if (err)
            return res.status(401).send(err);
        //Else API has been authenticated. Proceed.
        res.locals.user = response;
        next();
    });
};
// Gotta keep things Async for buildSchema
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [postResolver_1.default, authorResolver_1.default]
        });
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => ({
                // We pass the database connector into our resolvers via the context
                database: ddb
            })
        });
        // Setup Express and Apply Cognito Authentication
        const app = express_1.default();
        app.use(authenticateUser);
        // Apply our express middleware to our Apollo Server
        server.applyMiddleware({ app, path: "/graphql" });
        app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
    });
}
bootstrap();
