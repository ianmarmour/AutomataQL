import moment from "moment";

const resolvers = {
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

      await context.database.putItem(params).promise();

      return {
        id: id,
        date: creationDate,
        title: args.input.title,
        author: args.input.author,
        content: args.input.content
      };
    }
  }
};

export default resolvers;
