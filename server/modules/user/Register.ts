import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Authorized,
} from "type-graphql"
import bcrypt from "bcryptjs"

import { User } from "../../entity/User"
import { RegisterInput } from "./register/RegisterInput"
import { MyContext } from "../../types/MyContext"
import { isAuth } from "../middleware/isAuth"
import { logger } from "../middleware/logger"

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "Hello World!"
  }

  @Mutation(() => User)
  async register(
    @Arg("data")
    { email, password }: RegisterInput,
    @Ctx() ctx: MyContext,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      email,
      password: hashedPassword,
    }).save()

    ctx.req.session!.userId = user.id

    return user
  }
}
