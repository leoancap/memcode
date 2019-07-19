import bcrypt from "bcryptjs"
import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import { User } from "../../entity/User"
import { MyContext } from "../../types/MyContext"

@Resolver()
export class ContinueResolver {
  @Mutation(() => User, { nullable: true })
  async continue(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } })

    if (user) {
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) return null
      ctx.req.session!.userId = user.id
      return user
    } else {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await User.create({
        email,
        password: hashedPassword,
      }).save()
      ctx.req.session!.userId = user.id
      return user
    }
  }
}
