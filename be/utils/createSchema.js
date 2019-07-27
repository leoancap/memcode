"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const ChangePassword_1 = require("../modules/user/ChangePassword");
const ForgotPassword_1 = require("../modules/user/ForgotPassword");
const Login_1 = require("../modules/user/Login");
const Logout_1 = require("../modules/user/Logout");
const Me_1 = require("../modules/user/Me");
const Register_1 = require("../modules/user/Register");
const Deck_1 = require("../modules/deck/Deck");
const Exercise_1 = require("../modules/exercise/Exercise");
const DeckToReview_1 = require("../modules/user/DeckToReview");
exports.createSchema = () => type_graphql_1.buildSchema({
    resolvers: [
        Register_1.RegisterResolver,
        Login_1.LoginResolver,
        Logout_1.LogoutResolver,
        ChangePassword_1.ChangePasswordResolver,
        ForgotPassword_1.ForgotPasswordResolver,
        Me_1.MeResolver,
        Deck_1.DeckResolver,
        Exercise_1.ExerciseResolver,
        DeckToReview_1.DeckToReviewResolver,
    ],
    authChecker: ({ context: { req } }) => {
        return !!req.session.userId;
    },
});
