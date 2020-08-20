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
const FollowDatabase_1 = require("../data/FollowDatabase");
function follow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const unfollowId = req.body.unfollowId;
            const followId = req.body.followId;
            const token = req.headers.authorization;
            if (!token || !unfollowId && !followId) {
                throw new Error("Forneça token e id de usuário corretamente.");
            }
            ;
            const tokenData = Authenticator_1.default.getTokenData(token);
            const followedId = tokenData.id;
            if (followId) {
                yield new FollowDatabase_1.FollowDB().follow(followedId, followId);
                res.status(200).send({
                    message: "Seguido com sucesso."
                });
            }
            else {
                yield new FollowDatabase_1.FollowDB().unfollow(unfollowId);
                res.status(200).send({
                    message: "Deixou de seguir com sucesso."
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
exports.default = follow;
