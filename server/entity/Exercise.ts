import { Field, ID, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm"
import { Deck } from "./Deck"

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
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
  @Column()
  code: string

  @Field()
  @Column()
  solution: string

  @Field(() => String)
  @Column()
  tests: string

  @Field(() => String)
  @Column({ nullable: true })
  deckId: string

  @Field(() => Deck)
  @ManyToOne(() => Deck, deck => deck.exercises, {
    onDelete: "CASCADE",
  })
  deck: Deck
}
