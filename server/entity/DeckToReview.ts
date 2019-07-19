import { Ctx, Field, ID, ObjectType, Root } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { User } from "./User"
import { Exercise } from "./Exercise"
import { ExerciseToReview } from "./ExerciseToReview"
import { Deck } from "./Deck"

@ObjectType()
@Entity()
export class DeckToReview extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  deckToReviewId: string

  @Field()
  @OneToOne(() => Deck)
  @JoinColumn()
  deck: Deck

  @Field(() => User)
  @ManyToOne(() => User, user => user.decksToReview)
  user: User

  @Field(() => [ExerciseToReview])
  @OneToMany(() => ExerciseToReview, exercise => exercise.deckToReview, {
    cascade: true,
  })
  exercisesToReview: ExerciseToReview[]
}
