import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} from "graphql-tools";

import { graphql } from "graphql";
import { test } from "mocha";
import { expect } from "chai"; // Using Expect style
import typeDefs from "../schema";

const authorsTestCase = {
  id: "Authors Test Case",
  query: `
        query {
            authors {
                id
                name
                email
            }
        }
    `,
  variables: {},
  context: {},
  expected: {
    data: {
      authors: [{ id: "100", name: "Test Author", email: "testemail@test.com" }]
    }
  }
};

const postsTestCase = {
  id: "Posts Test Case",
  query: `
        query {
            posts {
                date
                title
                author
                content
                id
            }
        }
    `,
  variables: {},
  context: {},
  expected: {
    data: {
      posts: [
        {
          id: "100",
          content: "Test Content",
          author: "Test Author",
          date: "Test Date",
          title: "Test Title"
        }
      ]
    }
  }
};

const getAuthorTestCase = {
  id: "Get Author Test Case",
  query: `
        query {
            getAuthor {
                id
                name
                email
            }
        }
    `,
  variables: { id: "100" },
  context: {},
  expected: {
    data: {
      getAuthor: {
        id: "100",
        email: "testemail@test.com",
        name: "Test Author"
      }
    }
  }
};

const getPostTestCase = {
  id: "Get Post Test Case",
  query: `
        query {
            getPost {
                date
                title
                author
                content
                id
            }
        }
    `,
  variables: { id: "100" },
  context: {},
  expected: {
    data: {
      getPost: {
        id: "100",
        content: "Test Content",
        author: "Test Author",
        date: "Test Date",
        title: "Test Title"
      }
    }
  }
};

describe("Schema", () => {
  //Array of Case Types
  const cases = [
    authorsTestCase,
    postsTestCase,
    getPostTestCase,
    getAuthorTestCase
  ];

  const mockSchema = makeExecutableSchema({ typeDefs });

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Query: () => ({
        authors: o => [{ o }],
        posts: o => [{ o }]
      }),
      Author: () => ({
        id: () => "100",
        name: () => "Test Author",
        email: () => "testemail@test.com"
      }),
      Post: () => ({
        id: () => "100",
        content: () => "Test Content",
        author: () => "Test Author",
        date: () => "Test Date",
        title: () => "Test Title"
      })
    }
  });

  test("has valid type definitions", async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);

      await MockServer.query(`{ __schema { types { name }}}`);
    }).not.throw();
  });

  cases.forEach(obj => {
    const { id, query, variables, context, expected } = obj;
    test(`query: ${id}`, async () => {
      return await graphql(mockSchema, query, null, context, variables).then(
        data => {
          expect(data).to.eql(expected);
        }
      );
    });
  });
});
