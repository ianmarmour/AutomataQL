const resolvers = {
  Query: {
    getPost: async (_, args, context) => {
      var params = {
        TableName: "posts",
        Key: {
          id: { S: args.id }
        }
      };

      var response = await context.database.getItem(params).promise();

      return {
        id: response.Item.id.S,
        date: response.Item.date.S,
        title: response.Item.title.S,
        author: response.Item.author.S,
        content: response.Item.content.S
      };
    }
  }
};

export default resolvers;
