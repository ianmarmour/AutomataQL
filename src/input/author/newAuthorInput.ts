import { Field, ArgsType } from "type-graphql";

@ArgsType()
class NewAuthorInput {
  @Field()
  name: string;

  @Field()
  email: string;
}

export default NewAuthorInput;
