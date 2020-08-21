"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
const createUser_1 = __importDefault(require("./endpoints/createUser"));
const login_1 = __importDefault(require("./endpoints/login"));
const getProfile_1 = __importDefault(require("./endpoints/getProfile"));
const createRecipe_1 = __importDefault(require("./endpoints/createRecipe"));
const getRecipeById_1 = __importDefault(require("./endpoints/getRecipeById"));
const follow_1 = __importDefault(require("./endpoints/follow"));
const getFeed_1 = __importDefault(require("./endpoints/getFeed"));
const editRecipe_1 = __importDefault(require("./endpoints/editRecipe"));
const deleteRecipe_1 = __importDefault(require("./endpoints/deleteRecipe"));
const deleteAccount_1 = __importDefault(require("./endpoints/deleteAccount"));
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
app.post('/signup', createUser_1.default);
app.post('/login', login_1.default);
// o endpoint follow serve pra seguir e deixar de seguir, 
// apenas o body é alterado.
app.post('/user/follow', follow_1.default);
app.get('/user/feed', getFeed_1.default);
app.get('/user/profile', getProfile_1.default);
app.get('/user/profile/:id', getProfile_1.default);
app.delete('/user/delete/:id', deleteAccount_1.default);
app.post('/recipe', createRecipe_1.default);
app.post('/recipe/edit', editRecipe_1.default);
app.delete('/recipe/delete/:id', deleteRecipe_1.default);
app.get('/recipe/:id', getRecipeById_1.default);
const date = new Date();
const coisa = moment_1.default(date, 'YYYY-MM-DD');
console.log(coisa.format('DD-MM-YYYY'));
