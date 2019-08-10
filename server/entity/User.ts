import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  Generated,
} from "typeorm"
import { ObjectType, Field, ID, Root } from "type-graphql"
import { isEmailAlreadyInUse } from "../modules/user/register/isEmailAlreadyExist"
import { Deck } from "./Deck"
import { DeckToReview } from "./DeckToReview"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  @Generated("uuid")
  uuid: string

  @Field()
  @Column("text", { unique: true })
  @isEmailAlreadyInUse()
  email: string

  @Field()
  @Column()
  password: string

  @Field(() => [Deck])
  @OneToMany(() => Deck, deck => deck.user)
  decks: Deck[]

  @Field(() => [DeckToReview], { nullable: true })
  @OneToMany(() => DeckToReview, deck => deck.user, { nullable: true })
  decksToReview: DeckToReview[]
}
