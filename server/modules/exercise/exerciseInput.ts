import { Field, InputType } from "type-graphql"

@InputType()
export class ExerciseInput {
  @Field()
  deckId: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  code: string

  @Field()
  solution: string

  @Field(() => String)
  tests: string
}
