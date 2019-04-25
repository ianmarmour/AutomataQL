import { Field, ArgsType } from "type-graphql";

@ArgsType()
class PostInput {
  @Field()
  id: string;
}

export default PostInput;
