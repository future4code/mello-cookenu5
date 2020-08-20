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
const IdGenerator_1 = __importDefault(require("../service/IdGenerator"));
const Authenticator_1 = __importDefault(require("../service/Authenticator"));
const RecipesDatabase_1 = __importDefault(require("../data/RecipesDatabase"));
function createRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const { tittle, description } = req.body;
            if (!token || !tittle || !description) {
                throw new Error("Insira as informações corretamente.");
            }
            const id = IdGenerator_1.default.execute();
            const date = new Date();
            const tokenData = yield Authenticator_1.default.getTokenData(token);
            const userId = tokenData.id;
            yield new RecipesDatabase_1.default().createRecipe(tittle, description, date, id, userId);
            res.status(200).send({
                message: "Receita criada com sucesso"
            });
        }
        catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
        ;
    });
}
exports.default = createRecipe;
;
