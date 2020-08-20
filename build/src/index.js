"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const createUser_1 = __importDefault(require("./endpoints/createUser"));
const login_1 = __importDefault(require("./endpoints/login"));
const getOwnProfile_1 = __importDefault(require("./endpoints/getOwnProfile"));
const getAnotherProfile_1 = __importDefault(require("./endpoints/getAnotherProfile"));
const createRecipe_1 = __importDefault(require("./endpoints/createRecipe"));
const getRecipeById_1 = __importDefault(require("./endpoints/getRecipeById"));
const follow_1 = __importDefault(require("./endpoints/follow"));
const getFeed_1 = __importDefault(require("./endpoints/getFeed"));
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
app.get('/user/feed', getFeed_1.default);
app.post('/signup', createUser_1.default);
app.post('/login', login_1.default);
app.get('/user/profile', getOwnProfile_1.default);
app.post('/user/follow', follow_1.default);
app.get('/user/:id', getAnotherProfile_1.default);
app.post('/recipe', createRecipe_1.default);
app.get('/recipe/:id', getRecipeById_1.default);
