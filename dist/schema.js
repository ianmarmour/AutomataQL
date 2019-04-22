"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  scalar DATE\n\n  input authorInput {\n    email: String\n    name: String\n  }\n\n  input postInput {\n    title: String\n    author: String\n    content: String\n  }\n\n  type Post {\n    date: DATE\n    title: String\n    author: String\n    content: String\n    id: ID!\n  }\n\n  type Author {\n    email: String\n    name: String\n    id: ID!\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    authors: [Author]\n    posts: [Post]\n    getPost(id: ID): Post\n    getAuthor(id: ID): Author\n  }\n\n  type Mutation {\n    createAuthor(input: authorInput): Author!\n    createPost(input: postInput): Post!\n  }\n"], ["\n  scalar DATE\n\n  input authorInput {\n    email: String\n    name: String\n  }\n\n  input postInput {\n    title: String\n    author: String\n    content: String\n  }\n\n  type Post {\n    date: DATE\n    title: String\n    author: String\n    content: String\n    id: ID!\n  }\n\n  type Author {\n    email: String\n    name: String\n    id: ID!\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    authors: [Author]\n    posts: [Post]\n    getPost(id: ID): Post\n    getAuthor(id: ID): Author\n  }\n\n  type Mutation {\n    createAuthor(input: authorInput): Author!\n    createPost(input: postInput): Post!\n  }\n"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server"),
    gql = _require.gql;

// Construct a schema, using GraphQL schema language


var typeDefs = gql(_templateObject);

exports.default = typeDefs;