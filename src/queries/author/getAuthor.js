const resolvers = {
  Query: {
    getAuthor: async (_, args, context) => {
      var params = {
        TableName: "authors",
        Key: {
          id: { S: args.id }
        }
      };

      var response = await context.database.getItem(params).promise();

      return {
        id: response.Item.id.S,
        name: response.Item.name.S,
        email: response.Item.email.S
      };
    }
  }
};

export default resolvers;
