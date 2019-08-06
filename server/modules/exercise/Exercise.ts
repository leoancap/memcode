import { Arg, Int, Mutation, Query, Resolver, Ctx } from "type-graphql"
import { Deck } from "../../entity/Deck"
import { MyContext } from "../../types/MyContext"
import { Exercise } from "../../entity/Exercise"
import { ExerciseInput } from "./exerciseInput"

@Resolver()
export class ExerciseResolver {
  @Mutation(() => Deck, { nullable: true, complexity: 5 })
  async createExercise(
    @Arg("data") { deckId, ...data }: ExerciseInput,
    @Ctx() ctx: MyContext,
  ): Promise<Deck | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }
    const deck = await this.findDeckByIdAndUser(ctx.req.session!.userId, deckId)

    if (!deck) {
      return undefined
    }

    const newExer = await Exercise.create({ ...data }).save()

    deck!.exercises = [...deck!.exercises, newExer]
    await deck!.save()

    return deck
  }
  @Mutation(() => Deck, { nullable: true, complexity: 5 })
  async deleteExercise(
    @Arg("deckId") deckId: string,
    @Arg("exerciseId") exerciseId: string,
    @Ctx() ctx: MyContext,
  ): Promise<Deck | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }
    const exer = await Exercise.findOne({
      where: {
        id: exerciseId,
      },
    })
    await exer!.remove()

    return Deck.findOne({
      relations: ["user", "exercises"],
      where: {
        id: deckId,
      },
    })
  }

  @Query(() => Deck, { nullable: true })
  async findDeckByTitle(
    @Arg("user") userId: string,
    @Arg("title") title: string,
  ): Promise<Deck | undefined> {
    return Deck.findOne({
      relations: ["exercises", "user"],
      where: {
        userId,
        title,
      },
    })
  }

  @Query(() => Deck, { nullable: true })
  async findDeckById(@Arg("deckId") deckId: string): Promise<Deck | undefined> {
    return Deck.findOne({
      relations: ["user", "exercises"],
      where: {
        id: deckId,
      },
    })
  }

  @Query(() => Deck, { nullable: true })
  async findDeckByIdAndUser(
    @Arg("user") userId: string,
    @Arg("deckId") deckId: string,
  ): Promise<Deck | undefined> {
    return Deck.findOne({
      relations: ["exercises", "user"],
      where: {
        userId,
        id: deckId,
      },
    })
  }

  @Query(() => Deck, { nullable: true })
  async findDeckByPattern(
    @Arg("str") str: string,
  ): Promise<Deck[] | undefined> {
    return Deck.find({
      relations: ["exercises", "user"],
    })
  }
}
