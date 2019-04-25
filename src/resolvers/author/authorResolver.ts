import Author from "../../types/author/author";
import AuthorInput from "../../input/author/authorInput";
import NewAuthorInput from "../../input/author/newAuthorInput";
import { Context } from "../../interfaces/context.interface";
import { Arg, Args, Query, Resolver, Mutation, Ctx } from "type-graphql";

@Resolver(Author)
class AuthorResolver {
  @Query(returns => Author)
  async getAuthor(@Args() { id }: AuthorInput, @Ctx() { database }: Context) {
    var params = {
      TableName: "authors",
      Key: {
        id: { S: id }
      }
    };

    var response = await database.getItem(params).promise();

    return {
      id: response.Item.id.S,
      name: response.Item.name.S,
      email: response.Item.email.S
    };
  }

  @Query(returns => [Author])
  async authors(@Ctx() { database }: Context) {
    var params = {
      TableName: "authors"
    };

    var response = await database.scan(params).promise();

    var des_response = response.Items.map(item => ({
      id: item.id.S,
      name: item.name.S,
      email: item.email.S
    }));

    return des_response;
  }

  @Mutation(returns => Author)
  async createAuthor(
    @Args() { name, email }: NewAuthorInput,
    @Ctx() { database }: Context
  ) {
    var id = require("crypto")
      .randomBytes(10)
      .toString("hex");

    var params = {
      TableName: "authors",
      Item: {
        id: { S: id },
        name: { S: name },
        email: { S: email }
      }
    };

    await database.putItem(params).promise();

    return {
      id: id,
      name: name,
      email: email
    };
  }
}

export default AuthorResolver;
