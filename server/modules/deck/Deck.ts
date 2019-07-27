import { Arg, Int, Mutation, Query, Resolver, Ctx } from "type-graphql"
import { Deck } from "../../entity/Deck"
import { MyContext } from "../../types/MyContext"
import { User } from "../../entity/User"
import { DeckInput } from "./deckInput"

@Resolver()
export class DeckResolver {
  @Mutation(() => [Deck], { nullable: true, complexity: 5 })
  async createDeck(
    @Arg("data") data: DeckInput,
    @Ctx() ctx: MyContext,
  ): Promise<Deck[] | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }
    const deck = await Deck.create({ ...data }).save()

    const user = await User.findOne(ctx.req.session!.userId, {
      relations: ["decks"],
    })
    user!.decks = [...user!.decks, deck]
    await user!.save()

    return this.decks()
  }
  @Mutation(() => [Deck], { nullable: true, complexity: 5 })
  async deleteDeck(
    @Arg("deckId") deckId: string,
    @Ctx() ctx: MyContext,
  ): Promise<Deck[] | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }

    const deck = await Deck.findOne({
      relations: ["user"],
      where: {
        id: deckId,
      },
    })
    await deck!.remove()

    return this.decks()
  }

  @Query(() => [Deck])
  async findDecksByLanguage(@Arg("language") language: string) {
    return Deck.find({
      relations: ["user", "exercises"],
      where: {
        language,
      },
    })
  }

  @Query(() => [Deck])
  async decks() {
    return Deck.find({ relations: ["user", "exercises"] })
  }

  @Query(() => [Deck])
  async myDecks(@Ctx() ctx: MyContext): Promise<Deck[] | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }
    const decks = await Deck.find({
      relations: ["user", "exercises"],
      where: {
        userId: ctx.req.session!.userId,
      },
    })
    return decks
  }
}
