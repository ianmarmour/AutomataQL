const resolvers = {
  Mutation: {
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

      await context.database.putItem(params).promise();

      return {
        id: id,
        name: args.input.name,
        email: args.input.email
      };
    }
  }
};

export default resolvers;
