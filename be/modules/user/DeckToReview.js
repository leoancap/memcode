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
const User_1 = require("../../entity/User");
const DeckToReview_1 = require("../../entity/DeckToReview");
const ExerciseToReview_1 = require("../../entity/ExerciseToReview");
const Deck_1 = require("../../entity/Deck");
const Exercise_1 = require("../../entity/Exercise");
exports.today = () => Math.floor(new Date() / 8.64e7);
let DeckToReviewResolver = class DeckToReviewResolver {
    addDeckToReview(deckId, exerciseId, level, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.req.session.userId;
            const user = yield User_1.User.findOne(userId, {
                relations: ["decks", "decksToReview"],
            });
            if (!user) {
                return null;
            }
            const deckToR = yield DeckToReview_1.DeckToReview.findOne({
                relations: ["exercisesToReview", "user"],
                where: {
                    deckToReviewId: deckId,
                    userId,
                },
            });
            if (!deckToR) {
                const deckInfo = yield Deck_1.Deck.findOne({
                    where: {
                        id: deckId,
                    },
                });
                const deckCreated = yield DeckToReview_1.DeckToReview.create({
                    deckToReviewId: deckId,
                    deck: deckInfo,
                }).save();
                user.decksToReview = [...user.decksToReview, deckCreated];
                yield user.save();
            }
            this.addExerciseToReview(deckId, exerciseId, level, ctx);
            return null;
        });
    }
    addExerciseToReview(deckId, exerciseId, level, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.req.session.userId;
            const user = yield User_1.User.findOne(userId, {
                relations: ["decks", "decksToReview"],
            });
            if (!user) {
                return null;
            }
            const deckToR = yield DeckToReview_1.DeckToReview.findOne({
                relations: ["exercisesToReview", "user"],
                where: {
                    deckToReviewId: deckId,
                    userId,
                },
            });
            const exerToReview = yield ExerciseToReview_1.ExerciseToReview.findOne({
                where: {
                    exerciseId,
                },
            });
            if (!exerToReview) {
                const exerInfo = yield Exercise_1.Exercise.findOne({
                    where: {
                        id: exerciseId,
                    },
                });
                const newExerToReview = yield ExerciseToReview_1.ExerciseToReview.create({
                    nextInterval: level,
                    lastAttempt: exports.today(),
                    exerciseId,
                    exercise: exerInfo,
                }).save();
                deckToR.exercisesToReview = [
                    ...deckToR.exercisesToReview,
                    newExerToReview,
                ];
                yield deckToR.save();
            }
            else {
                this.strenghtenExercise(exerciseId, level, ctx);
            }
            return null;
        });
    }
    strenghtenExercise(exerciseId, level, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.req.session.userId;
            const user = yield User_1.User.findOne(userId, {
                relations: ["decks", "decksToReview"],
            });
            if (!user) {
                return null;
            }
            const exerToReview = yield ExerciseToReview_1.ExerciseToReview.findOne({
                where: {
                    exerciseId,
                },
            });
            if (exerToReview.nextInterval + exerToReview.lastAttempt <= exports.today()) {
                exerToReview.nextInterval =
                    level === -1
                        ? -1
                        : level === 1
                            ? Math.round(Math.abs(exerToReview.nextInterval) * 1.6)
                            : Math.round(Math.round(Math.abs(exerToReview.nextInterval) * 1.6) * 1.6);
                exerToReview.lastAttempt = exports.today();
                yield exerToReview.save();
            }
            return null;
        });
    }
    myDecksToReview(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.req.session.userId;
            const decks = yield DeckToReview_1.DeckToReview.find({
                relations: ["user", "exercisesToReview", "deck"],
                where: {
                    userId,
                },
            });
            console.log(decks);
            return decks;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("deckId")),
    __param(1, type_graphql_1.Arg("exerciseId")),
    __param(2, type_graphql_1.Arg("level")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], DeckToReviewResolver.prototype, "addDeckToReview", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("deckId")),
    __param(1, type_graphql_1.Arg("exerciseId")),
    __param(2, type_graphql_1.Arg("level")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], DeckToReviewResolver.prototype, "addExerciseToReview", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("exerciseId")),
    __param(1, type_graphql_1.Arg("level")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], DeckToReviewResolver.prototype, "strenghtenExercise", null);
__decorate([
    type_graphql_1.Query(() => [DeckToReview_1.DeckToReview], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeckToReviewResolver.prototype, "myDecksToReview", null);
DeckToReviewResolver = __decorate([
    type_graphql_1.Resolver()
], DeckToReviewResolver);
exports.DeckToReviewResolver = DeckToReviewResolver;
