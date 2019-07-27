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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const ExerciseToReview_1 = require("./ExerciseToReview");
const Deck_1 = require("./Deck");
let DeckToReview = class DeckToReview extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DeckToReview.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], DeckToReview.prototype, "deckToReviewId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.OneToOne(() => Deck_1.Deck),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Deck_1.Deck)
], DeckToReview.prototype, "deck", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, user => user.decksToReview),
    __metadata("design:type", User_1.User)
], DeckToReview.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [ExerciseToReview_1.ExerciseToReview]),
    typeorm_1.OneToMany(() => ExerciseToReview_1.ExerciseToReview, exercise => exercise.deckToReview, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], DeckToReview.prototype, "exercisesToReview", void 0);
DeckToReview = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], DeckToReview);
exports.DeckToReview = DeckToReview;
