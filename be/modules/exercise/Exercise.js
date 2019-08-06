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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Deck_1 = require("../../entity/Deck");
const Exercise_1 = require("../../entity/Exercise");
const exerciseInput_1 = require("./exerciseInput");
let ExerciseResolver = class ExerciseResolver {
    createExercise(_a, ctx) {
        var { deckId } = _a, data = __rest(_a, ["deckId"]);
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const deck = yield this.findDeckByIdAndUser(ctx.req.session.userId, deckId);
            if (!deck) {
                return undefined;
            }
            const newExer = yield Exercise_1.Exercise.create(Object.assign({}, data)).save();
            deck.exercises = [...deck.exercises, newExer];
            yield deck.save();
            return deck;
        });
    }
    deleteExercise(deckId, exerciseId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const exer = yield Exercise_1.Exercise.findOne({
                where: {
                    id: exerciseId,
                },
            });
            yield exer.remove();
            return Deck_1.Deck.findOne({
                relations: ["user", "exercises"],
                where: {
                    id: deckId,
                },
            });
        });
    }
    findDeckByTitle(userId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            return Deck_1.Deck.findOne({
                relations: ["exercises", "user"],
                where: {
                    userId,
                    title,
                },
            });
        });
    }
    findDeckById(deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Deck_1.Deck.findOne({
                relations: ["user", "exercises"],
                where: {
                    id: deckId,
                },
            });
        });
    }
    findDeckByIdAndUser(userId, deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Deck_1.Deck.findOne({
                relations: ["exercises", "user"],
                where: {
                    userId,
                    id: deckId,
                },
            });
        });
    }
    findDeckByPattern(str) {
        return __awaiter(this, void 0, void 0, function* () {
            return Deck_1.Deck.find({
                relations: ["exercises", "user"],
            });
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Deck_1.Deck, { nullable: true, complexity: 5 }),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exerciseInput_1.ExerciseInput, Object]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "createExercise", null);
__decorate([
    type_graphql_1.Mutation(() => Deck_1.Deck, { nullable: true, complexity: 5 }),
    __param(0, type_graphql_1.Arg("deckId")),
    __param(1, type_graphql_1.Arg("exerciseId")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "deleteExercise", null);
__decorate([
    type_graphql_1.Query(() => Deck_1.Deck, { nullable: true }),
    __param(0, type_graphql_1.Arg("user")),
    __param(1, type_graphql_1.Arg("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "findDeckByTitle", null);
__decorate([
    type_graphql_1.Query(() => Deck_1.Deck, { nullable: true }),
    __param(0, type_graphql_1.Arg("deckId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "findDeckById", null);
__decorate([
    type_graphql_1.Query(() => Deck_1.Deck, { nullable: true }),
    __param(0, type_graphql_1.Arg("user")),
    __param(1, type_graphql_1.Arg("deckId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "findDeckByIdAndUser", null);
__decorate([
    type_graphql_1.Query(() => Deck_1.Deck, { nullable: true }),
    __param(0, type_graphql_1.Arg("str")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "findDeckByPattern", null);
ExerciseResolver = __decorate([
    type_graphql_1.Resolver()
], ExerciseResolver);
exports.ExerciseResolver = ExerciseResolver;
