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
const Authenticator_1 = __importDefault(require("../service/Authenticator"));
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const token = req.headers.authorization;
            const tokenData = yield Authenticator_1.default.getTokenData(token);
            if (!tokenData) {
                throw new Error("Forneça informações corretamente.");
            }
            ;
            console.log(id);
            if (id) {
                const user = yield new UserDatabase_1.UserDB().getUserById(id);
                console.log(user);
                if (!user) {
                    throw new Error("Usuário não encontrado.");
                }
                ;
                res.status(200).send({
                    "email": user.email,
                    "name": user.name
                });
            }
            else {
                const user = yield new UserDatabase_1.UserDB().getUserById(tokenData.id);
                if (!user) {
                    throw new Error("Usuário não encontrado.");
                }
                ;
                res.status(200).send({
                    "email": user.email,
                    "name": user.name
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
exports.default = getProfile;
