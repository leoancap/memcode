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
const Deck_1 = require("../../entity/Deck");
const User_1 = require("../../entity/User");
const deckInput_1 = require("./deckInput");
let DeckResolver = class DeckResolver {
    createDeck(data, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const deck = yield Deck_1.Deck.create(Object.assign({}, data)).save();
            const user = yield User_1.User.findOne(ctx.req.session.userId, {
                relations: ["decks"],
            });
            user.decks = [...user.decks, deck];
            yield user.save();
            return this.decks();
        });
    }
    deleteDeck(deckId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const deck = yield Deck_1.Deck.findOne({
                relations: ["user"],
                where: {
                    id: deckId,
                },
            });
            yield deck.remove();
            return this.decks();
        });
    }
    findDecksByLanguage(language) {
        return __awaiter(this, void 0, void 0, function* () {
            return Deck_1.Deck.find({
                relations: ["user", "exercises"],
                where: {
                    language,
                },
            });
        });
    }
    decks() {
        return __awaiter(this, void 0, void 0, function* () {
            return Deck_1.Deck.find({ relations: ["user", "exercises"] });
        });
    }
    myDecks(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const decks = yield Deck_1.Deck.find({
                relations: ["user", "exercises"],
                where: {
                    userId: ctx.req.session.userId,
                },
            });
            return decks;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => [Deck_1.Deck], { nullable: true, complexity: 5 }),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deckInput_1.DeckInput, Object]),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "createDeck", null);
__decorate([
    type_graphql_1.Mutation(() => [Deck_1.Deck], { nullable: true, complexity: 5 }),
    __param(0, type_graphql_1.Arg("deckId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "deleteDeck", null);
__decorate([
    type_graphql_1.Query(() => [Deck_1.Deck]),
    __param(0, type_graphql_1.Arg("language")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "findDecksByLanguage", null);
__decorate([
    type_graphql_1.Query(() => [Deck_1.Deck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "decks", null);
__decorate([
    type_graphql_1.Query(() => [Deck_1.Deck]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeckResolver.prototype, "myDecks", null);
DeckResolver = __decorate([
    type_graphql_1.Resolver()
], DeckResolver);
exports.DeckResolver = DeckResolver;
