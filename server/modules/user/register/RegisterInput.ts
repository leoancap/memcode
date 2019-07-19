import { IsEmail } from "class-validator"
import { Field, InputType } from "type-graphql"
import { isEmailAlreadyInUse } from "./isEmailAlreadyExist"
import { PasswordMixin } from "../../shared/PasswordInput"

@InputType()
export class RegisterInput extends PasswordMixin() {
  @Field()
  @IsEmail()
  @isEmailAlreadyInUse({ message: "email already in use" })
  email: string
}
