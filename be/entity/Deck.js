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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Exercise_1 = require("./Exercise");
let Deck = class Deck extends typeorm_1.BaseEntity {
    bundledExercises(parent) {
        if (parent.exercises.length > 0) {
            return parent.exercises.map(exer => exer.solution).join(" ; ");
        }
        else {
            return "";
        }
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Deck.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Deck.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Deck.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Deck]),
    __metadata("design:returntype", String)
], Deck.prototype, "bundledExercises", null);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Deck.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Deck.prototype, "language", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Deck.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, user => user.decks),
    __metadata("design:type", User_1.User)
], Deck.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Exercise_1.Exercise]),
    typeorm_1.OneToMany(() => Exercise_1.Exercise, exercise => exercise.deck, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Deck.prototype, "exercises", void 0);
Deck = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Deck);
exports.Deck = Deck;
