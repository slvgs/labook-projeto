"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostBussiness_1 = require("../bussiness/PostBussiness");
const PostController_1 = require("../controller/PostController");
const PostDatabase_1 = require("../database/PostDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
exports.postRouter = express_1.default.Router();
const postController = new PostController_1.PostController(new PostBussiness_1.PostBussiness(new PostDatabase_1.PostDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator()));
exports.postRouter.get("/", postController.getPosts);
exports.postRouter.post("/", postController.createPosts);
exports.postRouter.put("/:id", postController.editPost);
exports.postRouter.delete("/:id", postController.deletePost);
exports.postRouter.put("/:id/like", postController.likeOrDislikePost);
//# sourceMappingURL=postsRouter.js.map