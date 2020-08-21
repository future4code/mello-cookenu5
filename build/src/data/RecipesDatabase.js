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
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
class RecipeDB extends BaseDatabase_1.default {
    createRecipe(tittle, description, createdAt, id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({ tittle, description, createdAt, id, userId })
                .into(RecipeDB.tableName);
            yield this.destroyConnection();
        });
    }
    ;
    getRecipeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(RecipeDB.tableName)
                .where({ id });
            return result[0];
        });
    }
    ;
    feed(followId) {
        return __awaiter(this, void 0, void 0, function* () {
            const feed = yield this.getConnection().raw(`
            SELECT * FROM Users
            JOIN Follow on Follow.followId = Users.id
            LEFT JOIN Recipes on Recipe.userId = followedId
            WHERE Users.id = "${followId}"
        `);
            return feed[0][0];
        });
    }
    ;
    editRecipe(userId, tittle, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryFields = [
                tittle && `tittle = "${tittle}"`,
                description && `description = "${description}"`
            ];
            queryFields = queryFields.filter(field => field);
            yield this.getConnection().raw(`
        UPDATE ${RecipeDB.tableName} 
        SET ${queryFields.join(",")}
        WHERE userId = "${userId}"
    `);
        });
    }
    ;
    deleteRecipe(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`
        DELETE FROM ${RecipeDB.tableName} 
        WHERE id = "${recipeId}"
        `);
        });
    }
}
exports.default = RecipeDB;
RecipeDB.tableName = "Recipe";
;
