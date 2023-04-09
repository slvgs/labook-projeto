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
exports.UserDataBase = void 0;
const basedatabase_1 = require("./basedatabase");
class UserDataBase extends basedatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insert = (userDB) => __awaiter(this, void 0, void 0, function* () {
            yield basedatabase_1.BaseDatabase
                .connection(UserDataBase.TABLE_USERS)
                .insert(userDB);
        });
        this.findEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const result = yield basedatabase_1.BaseDatabase
                .connection(UserDataBase.TABLE_USERS)
                .select()
                .where({ email });
            return result[0];
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userDB] = yield basedatabase_1.BaseDatabase.connection(UserDataBase.TABLE_USERS)
                .select().where({ email } && { password });
            return userDB;
        });
    }
}
exports.UserDataBase = UserDataBase;
UserDataBase.TABLE_USERS = "users";
//# sourceMappingURL=UserDataBase.js.map