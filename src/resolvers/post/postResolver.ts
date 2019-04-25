import Post from "../../types/post/post";
import PostInput from "../../input/post/postInput";
import NewPostInput from "../../input/post/newPostInput";
import { Context } from "../../interfaces/context.interface";

import moment from "moment";
import { Args, Query, Resolver, Mutation, Ctx } from "type-graphql";

@Resolver(Post)
class PostResolver {
  @Query(returns => Post)
  async getPost(@Args() { id }: PostInput, @Ctx() { database }: Context) {
    var params = {
      TableName: "posts",
      Key: {
        id: { S: id }
      }
    };

    var response = await database.getItem(params).promise();

    return {
      id: response.Item.id.S,
      date: response.Item.date.S,
      title: response.Item.title.S,
      author: response.Item.author.S,
      content: response.Item.content.S
    };
  }

  @Query(returns => [Post])
  async posts(@Ctx() { database }: Context) {
    var params = {
      TableName: "posts"
    };

    var response = await database.scan(params).promise();

    var des_response = response.Items.map(item => ({
      id: item.id.S,
      date: item.date.S,
      title: item.title.S,
      author: item.author.S,
      content: item.content.S
    }));

    return des_response;
  }

  @Mutation(returns => Post)
  async createPost(
    @Args() { title, author, content }: NewPostInput,
    @Ctx() { database }: Context
  ) {
    var id = require("crypto")
      .randomBytes(10)
      .toString("hex");

    var creationDate = moment().format("YYYY-MM-DD");

    var params = {
      TableName: "posts",
      Item: {
        id: { S: id },
        date: { S: creationDate },
        title: { S: title },
        author: { S: author },
        content: { S: content }
      }
    };

    await database.putItem(params).promise();

    return {
      id: id,
      date: creationDate,
      title: title,
      author: author,
      content: content
    };
  }
}

export default PostResolver;
