import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import session from "express-session"
import { createConnection } from "typeorm"
import connectRedis from "connect-redis"
import { User } from "./entity/User"
import cors from "cors"
import { redis } from "./redis"
import { createSchema } from "./utils/createSchema"
import { Deck } from "./entity/Deck"
import { Exercise } from "./entity/Exercise"
import { DeckToReview } from "./entity/DeckToReview"
import { ExerciseToReview } from "./entity/ExerciseToReview"
import cookieParser from "cookie-parser"

const main = async () => {
  await createConnection({
    name: "default",
    type: "postgres",
    url: process.env.postgres,
    synchronize: true,
    ssl: true,
    entities: [User, Deck, Exercise, DeckToReview, ExerciseToReview],
  })

  const app = express()
  const schema = await createSchema()
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
    }),
  })
  const RedisStore = connectRedis(session)
  app.use(cookieParser())
  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://memcode.leoancap.now.sh",
        "https://memcode.now.sh",
      ],
    }),
  )
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "shouldBeInENV",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  )
  apolloServer.applyMiddleware({ app, cors: false, path: "/be" })

  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000/be")
  })
}

main()
