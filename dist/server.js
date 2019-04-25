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
const apollo_server_1 = require("apollo-server");
const authorResolver_1 = __importDefault(require("./resolvers/author/authorResolver"));
const postResolver_1 = __importDefault(require("./resolvers/post/postResolver"));
const type_graphql_1 = require("type-graphql");
// DynamoDB Setup and Configuration
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
// Gotta keep things Async for buildSchema
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [postResolver_1.default, authorResolver_1.default]
        });
        const server = new apollo_server_1.ApolloServer({
            schema,
            context: ({ req }) => ({
                // We pass the database connector into our resolvers via the context
                database: ddb
            })
        });
        const { url } = yield server.listen(4000);
        console.log(`Server ready at ${url}`);
    });
}
bootstrap();
