'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('graphql'),
    buildSchema = _require.buildSchema;

// Construct a schema, using GraphQL schema language


var schema = buildSchema('\n\n  input AuthorInput {\n    name: String\n  }\n\n  input PostInput {\n    title: String\n    content: String\n    authorId: ID!\n  }\n\n  type Post {\n    id: ID!\n    title: String\n    content: String\n    authorId: ID!\n  }\n\n  type Author {\n    id: ID!\n    name: String\n  }\n\n  type Query {\n    posts: [Post]\n    authors: [Author]\n    getPost(id: ID!): Post\n    getAuthor(id: ID!): Author\n  }\n\n  type Subscription {\n    postCreated: Post\n  }\n\n  type Mutation {\n    createAuthor(input: AuthorInput): Author\n    createPost(input: PostInput): Post\n    updatePost(id: ID!, input: PostInput): Post\n  }\n');

exports.default = schema;