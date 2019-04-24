const resolvers = {
  Query: {
    posts: async (_, args, context) => {
      var params = {
        TableName: "posts"
      };

      var response = await context.database.scan(params).promise();

      var des_response = response.Items.map(item => ({
        id: item.id.S,
        date: item.date.S,
        title: item.title.S,
        author: item.author.S,
        content: item.content.S
      }));

      return des_response;
    }
  }
};

export default resolvers;
