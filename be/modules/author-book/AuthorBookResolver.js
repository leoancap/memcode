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
const Author_1 = require("../../entity/Author");
const AuthorBook_1 = require("../../entity/AuthorBook");
const Book_1 = require("../../entity/Book");
let AuthorBookResolver = class AuthorBookResolver {
    createBook(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return Book_1.Book.create({ name }).save();
        });
    }
    createAuthor(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return Author_1.Author.create({ name }).save();
        });
    }
    addAuthorBook(authorId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield AuthorBook_1.AuthorBook.create({ authorId, bookId }).save();
            return true;
        });
    }
    deleteBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield AuthorBook_1.AuthorBook.delete({ bookId });
            yield Book_1.Book.delete({ id: bookId });
            return true;
        });
    }
    books() {
        return __awaiter(this, void 0, void 0, function* () {
            return Book_1.Book.find();
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Book_1.Book),
    __param(0, type_graphql_1.Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthorBookResolver.prototype, "createBook", null);
__decorate([
    type_graphql_1.Mutation(() => Author_1.Author),
    __param(0, type_graphql_1.Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthorBookResolver.prototype, "createAuthor", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("authorId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("bookId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AuthorBookResolver.prototype, "addAuthorBook", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("bookId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthorBookResolver.prototype, "deleteBook", null);
__decorate([
    type_graphql_1.Query(() => [Book_1.Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorBookResolver.prototype, "books", null);
AuthorBookResolver = __decorate([
    type_graphql_1.Resolver()
], AuthorBookResolver);
exports.AuthorBookResolver = AuthorBookResolver;
//# sourceMappingURL=AuthorBookResolver.js.map