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
const faker_1 = __importDefault(require("faker"));
const User_1 = require("../../../entity/User");
const gCall_1 = require("../../../test-utils/gCall");
const testConn_1 = require("../../../test-utils/testConn");
let conn;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield testConn_1.testConn();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield conn.close();
}));
const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;
describe("Register", () => {
    it.only("create user", () => __awaiter(this, void 0, void 0, function* () {
        const user = {
            firstName: faker_1.default.name.firstName(),
            lastName: faker_1.default.name.lastName(),
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password(),
        };
        const response = yield gCall_1.gCall({
            source: registerMutation,
            variableValues: {
                data: user,
            },
        });
        if (response.errors) {
            console.log(response.errors[0].originalError);
        }
        expect(response).toMatchObject({
            data: {
                register: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            },
        });
        const dbUser = yield User_1.User.findOne({ where: { email: user.email } });
        expect(dbUser).toBeDefined();
    }));
});
//# sourceMappingURL=Register.test.js.map