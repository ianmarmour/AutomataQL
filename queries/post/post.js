import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
var moment = require("moment");

const resolvers = {
  DATE: GraphQLDate,
  Query: {
    authors: async (_, args, context) => {
      var params = {
        TableName: "authors"
      };

      var response = await context.database.scan(params).promise();

      var des_response = response.Items.map(item => ({
        id: item.id.S,
        name: item.name.S,
        email: item.email.S
      }));

      console.log(des_response);
      return des_response;
    },
    posts: async (_, args, context) => {
      var params = {
        TableName: "posts"
      };

      var response = await context.database.scan(params).promise();
      console.log(response.Items);
      var des_response = response.Items.map(item => ({
        id: item.id.S,
        date: item.date.S,
        title: item.title.S,
        author: item.author.S,
        content: item.content.S
      }));

      console.log(des_response);
      return des_response;
    },
    getPost: async (_, args, context) => {
      var params = {
        TableName: "posts",
        Key: {
          id: { S: args.id }
        }
      };

      var response = await context.database.getItem(params).promise();
      console.log(response.Item);
      return {
        id: response.Item.id.S,
        date: response.Item.date.S,
        title: response.Item.title.S,
        author: response.Item.author.S,
        content: response.Item.content.S
      };
    },
    getAuthor: async (_, args, context) => {
      var params = {
        TableName: "authors",
        Key: {
          id: { S: args.id }
        }
      };

      var response = await context.database.getItem(params).promise();
      console.log(response.Item);
      return {
        id: response.Item.id.S,
        name: response.Item.name.S,
        email: response.Item.email.S
      };
    }
  },
  Mutation: {
    createPost: async (_, args, context) => {
      var id = require("crypto")
        .randomBytes(10)
        .toString("hex");

      var creationDate = moment().format("YYYY-MM-DD");

      var params = {
        TableName: "posts",
        Item: {
          id: { S: id },
          date: { S: creationDate },
          title: { S: args.input.title },
          author: { S: args.input.author },
          content: { S: args.input.content }
        }
      };

      var response = await context.database.putItem(params).promise();
      console.log(response);
      return {
        id: id,
        date: creationDate,
        title: args.input.title,
        author: args.input.author,
        content: args.input.content
      };
    },
    createAuthor: async (_, args, context) => {
      var id = require("crypto")
        .randomBytes(10)
        .toString("hex");

      var params = {
        TableName: "authors",
        Item: {
          id: { S: id },
          name: { S: args.input.name },
          email: { S: args.input.email }
        }
      };

      var response = await context.database.putItem(params).promise();
      console.log(response);
      return {
        id: id,
        name: args.input.name,
        email: args.input.email
      };
    }
  }
};

export default resolvers;
