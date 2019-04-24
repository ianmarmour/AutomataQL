import { merge } from "lodash";
import createPost from "./mutations/post/createPost";
import createAuthor from "./mutations/author/createAuthor";
import posts from "./queries/post/posts";
import getPost from "./queries/post/getPost";
import authors from "./queries/author/authors";
import getAuthor from "./queries/author/getAuthor";
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar DATE

  input authorInput {
    email: String
    name: String
  }

  input postInput {
    title: String
    author: String
    content: String
  }

  type Post {
    date: DATE
    title: String
    author: String
    content: String
    id: ID!
  }

  type Author {
    email: String!
    name: String!
    id: ID!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    authors: [Author]
    posts: [Post]
    getPost(id: ID): Post
    getAuthor(id: ID): Author
  }

  type Mutation {
    createAuthor(input: authorInput): Author!
    createPost(input: postInput): Post!
  }
`;

const resolvers = merge(
  posts,
  getPost,
  authors,
  getAuthor,
  createPost,
  createAuthor
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
