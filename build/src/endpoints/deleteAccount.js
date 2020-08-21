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
const Authenticator_1 = __importDefault(require("../service/Authenticator"));
const UserDatabase_1 = require("../data/UserDatabase");
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const tokenData = yield Authenticator_1.default.getTokenData(token);
            const role = tokenData.role;
            const id = req.params.id;
            const user = yield new UserDatabase_1.UserDB().getUserById(id);
            if (user.length < 0) {
                throw new Error("Usário não encontrado. ");
            }
            if (role !== "ADMIN") {
                throw new Error("Não autorizado!");
            }
            else {
                yield new UserDatabase_1.UserDB().deleteUser(id);
                res.status(200).send({
                    message: "Deletado com sucesso."
                });
            }
        }
        catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    });
}
exports.default = deleteUser;
