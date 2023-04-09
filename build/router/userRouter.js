"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userBussiness_1 = require("../bussiness/userBussiness");
const userController_1 = require("../controller/userController");
const UserDataBase_1 = require("../database/UserDataBase");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
exports.userRouter = express_1.default.Router();
const userController = new userController_1.UserController(new userBussiness_1.UserBussiness(new UserDataBase_1.UserDataBase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new HashManager_1.HashManager()));
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.post("/login", userController.login);
//# sourceMappingURL=userRouter.js.map