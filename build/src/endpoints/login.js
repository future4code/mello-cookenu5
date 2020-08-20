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
const UserDatabase_1 = require("../data/UserDatabase");
const HashManager_1 = __importDefault(require("../service/HashManager"));
const Authenticator_1 = __importDefault(require("../service/Authenticator"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield new UserDatabase_1.UserDB().getUserByEmail(email);
            if (user.lenght < 1) {
                throw new Error("Usuário não encontrado.");
            }
            if (!email || !password) {
                throw new Error("Prencha corretamente os campos.");
            }
            const token = yield Authenticator_1.default.generateToken(user.id);
            const isPasswordCorrect = yield HashManager_1.default.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new Error("Dados incorretos");
            }
            else {
                res.status(200).send({
                    message: "Sucesso no login",
                    token
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
exports.default = login;
