import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Author {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  id: string;
}

export default Author;
