"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBussiness = void 0;
const User_1 = require("../models/User");
const types_1 = require("../types");
const BadRequestError_1 = require("../error/BadRequestError");
const NotFoundError_1 = require("../error/NotFoundError");
class UserBussiness {
    constructor(userDataBase, idGenerator, tokenManager, hashManager) {
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            if (typeof name !== "string") {
                throw new BadRequestError_1.BadRequestError("'name' deve ser string");
            }
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'password' deve ser string");
            }
            const id = this.idGenerator.generate();
            const role = types_1.USER_ROLE.NORMAL;
            const newUser = new User_1.User(id, name, email, password, role, new Date().toISOString());
            const userDB = newUser.toDBModel();
            yield this.userDataBase.insert(userDB);
            const postload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            };
            const output = {
                token: this.tokenManager.createToken(postload)
            };
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (typeof email !== "string") {
                throw new BadRequestError_1.BadRequestError("'email' deve ser string");
            }
            if (typeof password !== "string") {
                throw new BadRequestError_1.BadRequestError("'password' deve ser string");
            }
            const userDBCorrect = yield this.userDataBase.findEmail(email);
            if (!userDBCorrect) {
                throw new NotFoundError_1.NotFoundError("'email' não cadastrado");
            }
            const isPasswordCorrect = yield this.hashManager
                .compare(password, userDBCorrect.password);
            if (isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError("'password' incorreto");
            }
            if (userDBCorrect) {
                const user = new User_1.User(userDBCorrect.id, userDBCorrect.email, userDBCorrect.name, userDBCorrect.password, userDBCorrect.role, userDBCorrect.created_at);
                const postload = {
                    id: user.getId(),
                    name: user.getName(),
                    role: user.getRole()
                };
                const token = this.tokenManager.createToken(postload);
                const output = { message: "Seu login foi realizado com sucesso", token };
                return output;
            }
            else {
                const output = { message: "Dados incorretos!" };
                return output;
            }
        });
    }
}
exports.UserBussiness = UserBussiness;
//# sourceMappingURL=userBussiness.js.map