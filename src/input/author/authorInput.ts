import { Field, ArgsType, ID } from "type-graphql";

@ArgsType()
class AuthorInput {
  @Field(type => ID)
  id: string;
}

export default AuthorInput;
