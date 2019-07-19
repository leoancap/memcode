import { buildSchema } from "type-graphql"
import { ChangePasswordResolver } from "../modules/user/ChangePassword"
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword"
import { LoginResolver } from "../modules/user/Login"
import { LogoutResolver } from "../modules/user/Logout"
import { MeResolver } from "../modules/user/Me"
import { RegisterResolver } from "../modules/user/Register"
import { DeckResolver } from "../modules/deck/Deck"
import { ExerciseResolver } from "../modules/exercise/Exercise"
import { DeckToReviewResolver } from "../modules/user/DeckToReview"

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      ChangePasswordResolver,
      ForgotPasswordResolver,
      MeResolver,
      DeckResolver,
      ExerciseResolver,
      DeckToReviewResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId
    },
  })
