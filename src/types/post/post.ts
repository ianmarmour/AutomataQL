import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Post {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  author: string;
}

export default Post;
