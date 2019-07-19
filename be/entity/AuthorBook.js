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
const Author_1 = require("./Author");
const Book_1 = require("./Book");
let AuthorBook = class AuthorBook extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], AuthorBook.prototype, "authorId", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], AuthorBook.prototype, "bookId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Author_1.Author, author => author.bookConnection, { primary: true }),
    typeorm_1.JoinColumn({ name: "authorId" }),
    __metadata("design:type", Promise)
], AuthorBook.prototype, "author", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Book_1.Book, book => book.authorConnection, {
        primary: true
    }),
    typeorm_1.JoinColumn({ name: "bookId" }),
    __metadata("design:type", Promise)
], AuthorBook.prototype, "book", void 0);
AuthorBook = __decorate([
    typeorm_1.Entity()
], AuthorBook);
exports.AuthorBook = AuthorBook;
//# sourceMappingURL=AuthorBook.js.map