import { MiddlewareFn } from "type-graphql"

import { MyContext } from "../../types/MyContext"

export const logger: MiddlewareFn<MyContext> = ({ args }, next) => {
  console.log("args: ", args)

  return next()
}
