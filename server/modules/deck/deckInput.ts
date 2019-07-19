import { Field, InputType } from "type-graphql"

@InputType()
export class DeckInput {
  @Field()
  title: string

  @Field()
  description: string

  @Field(() => [String])
  tags: string[]

  @Field()
  language: string
}
