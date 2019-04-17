var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  input AuthorInput {
    name: String
  }

  input PostInput {
    title: String
    content: String
    authorId: ID!
  }

  type Post {
    id: ID!
    title: String
    content: String
    authorId: ID!
  }

  type Author {
    id: ID!
    name: String
  }

  type Query {
    posts: [Post]
    authors: [Author]
    getPost(id: ID!): Post
    getAuthor(id: ID!): Author
  }

  type Subscription {
    postCreated: Post
  }

  type Mutation {
    createAuthor(input: AuthorInput): Author
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
  }
`);

export default schema;