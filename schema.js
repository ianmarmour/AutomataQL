const { gql } = require("apollo-server");

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

export default typeDefs;
