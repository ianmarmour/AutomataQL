const resolvers = {
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

      return des_response;
    }
  }
};

export default resolvers;
