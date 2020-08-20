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
const HashManager_1 = __importDefault(require("../service/HashManager"));
const IdGenerator_1 = __importDefault(require("../service/IdGenerator"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const id = IdGenerator_1.default.execute();
            const cypherText = yield HashManager_1.default.hash(password);
            if (!name || !email || !password) {
                throw new Error("Todos os campos são obrigatórios.");
            }
            if (password.length < 6) {
                throw new Error("sua senha precisa ter no mínimo 6 caracteres.");
            }
            yield new UserDatabase_1.UserDB().createUser(name, email, cypherText, id);
            const token = Authenticator_1.default.generateToken({ id });
            res
                .status(200)
                .send({
                message: "Usuário criado!",
                token
            });
        }
        catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    });
}
exports.default = createUser;
