import { Field, ID, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { DeckToReview } from "./DeckToReview"
import { Exercise } from "./Exercise"

@ObjectType()
@Entity()
export class ExerciseToReview extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  exerciseId: string

  @Field()
  @Column()
  nextInterval: number

  @Field()
  @OneToOne(() => Exercise, {
    eager: true,
  })
  @JoinColumn()
  exercise: Exercise

  @Field()
  @Column()
  lastAttempt: number

  @Field(() => DeckToReview)
  @ManyToOne(() => DeckToReview, deck => deck.exercisesToReview, {
    onDelete: "CASCADE",
  })
  deckToReview: DeckToReview
}
