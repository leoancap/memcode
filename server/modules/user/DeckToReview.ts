import bcrypt from "bcryptjs"
import { Arg, Ctx, Mutation, Resolver, Query } from "type-graphql"
import { User } from "../../entity/User"
import { MyContext } from "../../types/MyContext"
import { DeckToReview } from "../../entity/DeckToReview"
import { ExerciseToReview } from "../../entity/ExerciseToReview"
import { Deck } from "../../entity/Deck"
import { Exercise } from "../../entity/Exercise"

export const today = () => Math.floor((new Date() as any) / 8.64e7)

type level = -1 | 1 | 2

@Resolver()
export class DeckToReviewResolver {
  @Mutation(() => User, { nullable: true })
  async addDeckToReview(
    @Arg("deckId") deckId: string,
    @Arg("exerciseId") exerciseId: string,
    @Arg("level") level: level,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const userId = ctx.req.session!.userId
    const user = await User.findOne(userId, {
      relations: ["decks", "decksToReview"],
    })
    if (!user) {
      return null
    }

    const deckToR = await DeckToReview.findOne({
      relations: ["exercisesToReview", "user"],
      where: {
        deckToReviewId: deckId,
        userId,
      },
    })
    if (!deckToR) {
      const deckInfo = await Deck.findOne({
        where: {
          id: deckId,
        },
      })
      const deckCreated = await DeckToReview.create({
        deckToReviewId: deckId,
        deck: deckInfo,
      }).save()
      user.decksToReview = [...user.decksToReview, deckCreated]
      await user.save()
    }
    this.addExerciseToReview(deckId, exerciseId, level, ctx)
    return null
  }

  @Mutation(() => User, { nullable: true })
  async addExerciseToReview(
    @Arg("deckId") deckId: string,
    @Arg("exerciseId") exerciseId: string,
    @Arg("level") level: level,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const userId = ctx.req.session!.userId
    const user = await User.findOne(userId, {
      relations: ["decks", "decksToReview"],
    })
    if (!user) {
      return null
    }
    const deckToR = await DeckToReview.findOne({
      relations: ["exercisesToReview", "user"],
      where: {
        deckToReviewId: deckId,
        userId,
      },
    })
    const exerToReview = await ExerciseToReview.findOne({
      where: {
        exerciseId,
      },
    })
    if (!exerToReview) {
      const exerInfo = await Exercise.findOne({
        where: {
          id: exerciseId,
        },
      })
      const newExerToReview = await ExerciseToReview.create({
        nextInterval: level,
        lastAttempt: today(),
        exerciseId,
        exercise: exerInfo,
      }).save()
      deckToR!.exercisesToReview = [
        ...deckToR!.exercisesToReview,
        newExerToReview,
      ]
      await deckToR!.save()
    } else {
      this.strenghtenExercise(exerciseId, level, ctx)
    }
    return null
  }

  @Mutation(() => User, { nullable: true })
  async strenghtenExercise(
    @Arg("exerciseId") exerciseId: string,
    @Arg("level") level: level,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const userId = ctx.req.session!.userId
    const user = await User.findOne(userId, {
      relations: ["decks", "decksToReview"],
    })
    if (!user) {
      return null
    }
    const exerToReview = await ExerciseToReview.findOne({
      where: {
        exerciseId,
      },
    })
    if (exerToReview!.nextInterval + exerToReview!.lastAttempt <= today()) {
      exerToReview!.nextInterval =
        level === -1
          ? -1
          : level === 1
          ? Math.round(Math.abs(exerToReview!.nextInterval) * 1.6)
          : Math.round(
              Math.round(Math.abs(exerToReview!.nextInterval) * 1.6) * 1.6,
            )
      exerToReview!.lastAttempt = today()
      await exerToReview!.save()
    }
    return null
  }

  @Query(() => [DeckToReview], { nullable: true })
  async myDecksToReview(
    @Ctx() ctx: MyContext,
  ): Promise<DeckToReview[] | undefined> {
    const userId = ctx.req.session!.userId
    const decks = await DeckToReview.find({
      relations: ["user", "exercisesToReview", "deck"],
      where: {
        userId,
      },
    })

    console.log(decks)
    return decks
  }
}
