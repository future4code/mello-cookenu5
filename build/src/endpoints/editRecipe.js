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
function editRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { recipeId, tittle, description } = req.body;
            const recipe = yield new RecipesDatabase_1.default().getRecipeById(recipeId);
            const token = req.headers.authorization;
            const tokenData = yield Authenticator_1.default.getTokenData(token);
            if (tokenData.id !== recipe.userId) {
                throw new Error("Você não pode alterar receitas que não são suas.");
            }
            else {
                yield new RecipesDatabase_1.default().editRecipe(tokenData.id, tittle, description);
                res.status(200).send({
                    message: "Receita alterada com sucesso"
                });
            }
            ;
        }
        catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
        ;
    });
}
exports.default = editRecipe;
;
