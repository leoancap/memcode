"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = ({ args }, next) => {
    console.log("args: ", args);
    return next();
};
