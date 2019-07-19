import { Ctx, Field, ID, ObjectType, Root } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from "typeorm"
import { User } from "./User"
import { Exercise } from "./Exercise"
import { DeckToReview } from "./DeckToReview"

@ObjectType()
@Entity()
export class Deck extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string

  @Field()
  bundledExercises(@Root() parent: Deck): string {
    if (parent.exercises.length > 0) {
      return parent.exercises.map(exer => exer.solution).join(" ; ")
    } else {
      return ""
    }
  }

  @Field(() => [String])
  @Column("simple-array")
  tags: string[]

  @Field()
  @Column()
  language: string

  @Field()
  @Column({ nullable: true })
  userId: number

  @Field(() => User)
  @ManyToOne(() => User, user => user.decks)
  user: User

  @Field(() => [Exercise])
  @OneToMany(() => Exercise, exercise => exercise.deck, {
    cascade: true,
  })
  exercises: Exercise[]
}
