"use strict";

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

var _post = require("./queries/post/post");

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("apollo-server"),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

// DynamoDB Setup and Configuration
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var server = new ApolloServer({
  typeDefs: _schema2.default,
  resolvers: _post2.default,
  context: function context(_ref) {
    var req = _ref.req;
    return {
      // We pass the database connector into our resolvers via the context
      database: ddb
    };
  }
});

server.listen().then(function (_ref2) {
  var url = _ref2.url;

  console.log("Server ready at " + url);
});