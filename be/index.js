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
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const typeorm_1 = require("typeorm");
const connect_redis_1 = __importDefault(require("connect-redis"));
const User_1 = require("./entity/User");
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("./redis");
const createSchema_1 = require("./utils/createSchema");
const Deck_1 = require("./entity/Deck");
const Exercise_1 = require("./entity/Exercise");
const DeckToReview_1 = require("./entity/DeckToReview");
const ExerciseToReview_1 = require("./entity/ExerciseToReview");
const dev = process.env.NODE_ENV !== "production";
(() => __awaiter(this, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        name: "default",
        type: "postgres",
        url: process.env.postgres,
        synchronize: true,
        ssl: true,
        entities: [User_1.User, Deck_1.Deck, Exercise_1.Exercise, DeckToReview_1.DeckToReview, ExerciseToReview_1.ExerciseToReview],
    });
    const app = express_1.default();
    const schema = yield createSchema_1.createSchema();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });
    const RedisStore = connect_redis_1.default(express_session_1.default);
    // app.use(cors())
    app.use(cors_1.default({
        credentials: true,
        origin: [
            "http://localhost:3000",
            "https://memcode.leoancap.now.sh",
            "https://memcode.now.sh",
        ],
    }));
    app.use(express_session_1.default({
        store: new RedisStore({
            client: redis_1.redis,
        }),
        name: "qid",
        secret: "shouldBeInENV",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
    }));
    apolloServer.applyMiddleware({ app, cors: false, path: "/be" });
    app.listen(4000, () => {
        console.log("Listening on http://localhost:4000/be");
    });
}))();
//# sourceMappingURL=index.js.map