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
const RecipesDatabase_1 = __importDefault(require("../data/RecipesDatabase"));
const Authenticator_1 = __importDefault(require("../service/Authenticator"));
const moment_1 = __importDefault(require("moment"));
function getRecipeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const id = req.params.id;
            if (!token || !id) {
                throw new Error("Forneça os dados corretamente.");
            }
            ;
            const tokenData = Authenticator_1.default.getTokenData(token);
            const result = yield new RecipesDatabase_1.default().getRecipeById(id);
            const formatDate = moment_1.default(result.createdAt, 'YYYY-MM-DD');
            res.status(200).send({
                "id": result.id,
                "titulo": result.tittle,
                "description": result.description,
                "createdAt": formatDate.format('DD-MM-YYYY')
            });
        }
        catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    });
}
exports.default = getRecipeById;
