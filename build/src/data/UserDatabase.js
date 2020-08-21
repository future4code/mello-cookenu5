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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDB = void 0;
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
class UserDB extends BaseDatabase_1.default {
    createUser(name, email, password, id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({ id, name, email, password, role })
                .into(UserDB.tableName);
            yield this.destroyConnection();
        });
    }
    ;
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(UserDB.tableName)
                .where({ email });
            yield this.destroyConnection();
            return result[0];
        });
    }
    ;
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(UserDB.tableName)
                .where({ id });
            yield this.destroyConnection();
            return result[0];
        });
    }
    ;
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`
        DELETE FROM ${UserDB.tableName} 
        WHERE id = "${id}"
        `);
        });
    }
}
exports.UserDB = UserDB;
UserDB.tableName = "Users";
