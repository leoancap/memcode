"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const RegisterInput_1 = require("./register/RegisterInput");
const User_1 = require("../../entity/User");
const Product_1 = require("../../entity/Product");
function createResolver(suffix, returnType, inputType, entity) {
    let BaseResolver = class BaseResolver {
        create(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return entity.create(data).save();
            });
        }
    };
    __decorate([
        type_graphql_1.Mutation(() => returnType, { name: `create${suffix}` }),
        type_graphql_1.UseMiddleware(),
        __param(0, type_graphql_1.Arg("data", () => inputType)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolver.prototype, "create", null);
    BaseResolver = __decorate([
        type_graphql_1.Resolver()
    ], BaseResolver);
    return BaseResolver;
}
let ProductInput = class ProductInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInput.prototype, "name", void 0);
ProductInput = __decorate([
    type_graphql_1.InputType()
], ProductInput);
exports.CreateUserResolver = createResolver("User", User_1.User, RegisterInput_1.RegisterInput, User_1.User);
exports.CreateProductResolver = createResolver("Product", Product_1.Product, ProductInput, Product_1.Product);
//# sourceMappingURL=CreateUser.js.map