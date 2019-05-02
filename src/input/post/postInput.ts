import { Field, ArgsType, ID } from "type-graphql";

@ArgsType()
class PostInput {
  @Field(type => ID)
  id: string;
}

export default PostInput;
