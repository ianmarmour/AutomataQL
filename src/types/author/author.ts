import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
class Author {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field(type => ID)
  id: string;
}

export default Author;
