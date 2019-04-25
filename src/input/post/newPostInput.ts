import { Field, ArgsType } from "type-graphql";

@ArgsType()
class NewPostInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  content: string;
}

export default NewPostInput;
