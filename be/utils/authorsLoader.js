"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const typeorm_1 = require("typeorm");
const AuthorBook_1 = require("../entity/AuthorBook");
const batchAuthors = (bookIds) => __awaiter(this, void 0, void 0, function* () {
    const authorBooks = yield AuthorBook_1.AuthorBook.find({
        join: {
            alias: "authorBook",
            innerJoinAndSelect: {
                author: "authorBook.author"
            }
        },
        where: {
            bookId: typeorm_1.In(bookIds)
        }
    });
    const bookIdToAuthors = {};
    /*
    {
      authorId: 1,
      bookId: 1,
      __author__: { id: 1, name: 'author1' }
    }
    */
    authorBooks.forEach(ab => {
        if (ab.bookId in bookIdToAuthors) {
            bookIdToAuthors[ab.bookId].push(ab.__author__);
        }
        else {
            bookIdToAuthors[ab.bookId] = [ab.__author__];
        }
    });
    return bookIds.map(bookId => bookIdToAuthors[bookId]);
});
exports.createAuthorsLoader = () => new dataloader_1.default(batchAuthors);
//# sourceMappingURL=authorsLoader.js.map