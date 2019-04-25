import { Field, ArgsType } from "type-graphql";

@ArgsType()
class AuthorInput {
  @Field()
  id: string;
}

export default AuthorInput;
