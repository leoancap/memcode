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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const isEmailAlreadyExist_1 = require("../modules/user/register/isEmailAlreadyExist");
const Deck_1 = require("./Deck");
const DeckToReview_1 = require("./DeckToReview");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.Generated("uuid"),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text", { unique: true }),
    isEmailAlreadyExist_1.isEmailAlreadyInUse(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => [Deck_1.Deck]),
    typeorm_1.OneToMany(() => Deck_1.Deck, deck => deck.user),
    __metadata("design:type", Array)
], User.prototype, "decks", void 0);
__decorate([
    type_graphql_1.Field(() => [DeckToReview_1.DeckToReview], { nullable: true }),
    typeorm_1.OneToMany(() => DeckToReview_1.DeckToReview, deck => deck.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "decksToReview", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
