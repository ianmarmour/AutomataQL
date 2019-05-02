import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
class Post {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  author: string;
}

export default Post;
