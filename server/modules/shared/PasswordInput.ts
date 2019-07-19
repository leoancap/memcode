import { MinLength } from "class-validator";
import { Field, InputType, ClassType } from "type-graphql";

export const PasswordMixin = <T extends ClassType>(BaseClass?: T) => {
  let ExtraClass: any;
  if (!BaseClass) {
    ExtraClass = class {};
  }
  @InputType({ isAbstract: true })
  class PasswordInput extends ExtraClass {
    @Field()
    @MinLength(5)
    password: string;
  }
  return PasswordInput;
};
