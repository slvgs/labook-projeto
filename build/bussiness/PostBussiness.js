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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBussiness = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const NotFoundError_1 = require("../error/NotFoundError");
const Post_1 = require("../models/Post");
const types_1 = require("../types");
class PostBussiness {
    constructor(postDatabase, tokenManager, idGenerator) {
        this.postDatabase = postDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.getPosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const postload = this.tokenManager.getPayload(token);
            if (postload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            const postsWithCreatorDB = yield this.postDatabase
                .getPostsWithCreators();
            const posts = postsWithCreatorDB.map((postWithCreatorDB) => {
                const post = new Post_1.Post(postWithCreatorDB.id, postWithCreatorDB.content, postWithCreatorDB.likes, postWithCreatorDB.dislikes, postWithCreatorDB.created_at, postWithCreatorDB.update_at, postWithCreatorDB.creator_id, postWithCreatorDB.creator_name);
                return post.toBussinesModel();
            });
            const output = posts;
            return output;
        });
        this.createPosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, content } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const postload = this.tokenManager.getPayload(token);
            if (postload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            if (typeof content !== "string") {
                throw new BadRequestError_1.BadRequestError("'name' deve ser string");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const updateAt = new Date().toISOString();
            const creatorId = postload.id;
            const creatorContent = postload.name;
            const post = new Post_1.Post(id, content, 0, 0, createdAt, updateAt, creatorId, creatorContent);
            const postDB = post.toDBModel();
            yield this.postDatabase.insert(postDB);
        });
        this.editPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToEdit, token, content } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const postload = this.tokenManager.getPayload(token);
            if (postload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            if (typeof content !== "string") {
                throw new BadRequestError_1.BadRequestError("'name' deve ser string");
            }
            const postDB = yield this.postDatabase.findById(idToEdit);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = postload.id;
            if (postDB.creator_id !== creatorId) {
                throw new BadRequestError_1.BadRequestError("somente quem criou a playlist pode editá-la");
            }
            const creatorContent = postload.name;
            const post = new Post_1.Post(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.update_at, creatorId, creatorContent);
            post.setContent(content);
            post.setUpdateAt(new Date().toISOString());
            const updatePostDB = post.toDBModel();
            yield this.postDatabase.update(idToEdit, updatePostDB);
        });
        this.deletePosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToDelete, token } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const postload = this.tokenManager.getPayload(token);
            if (postload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            const postDB = yield this.postDatabase.findById(idToDelete);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = postload.id;
            if (postload.role !== types_1.USER_ROLE.ADMIN && postDB.creator_id !== creatorId) {
                throw new BadRequestError_1.BadRequestError("somente quem criou a playlist pode deletá-la");
            }
            yield this.postDatabase.delete(idToDelete);
        });
        this.likeOrDislikePosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToLikeDislike, token, like } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const postload = this.tokenManager.getPayload(token);
            if (postload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            if (typeof like !== "boolean") {
                throw new BadRequestError_1.BadRequestError("'like' deve ser boolean");
            }
            const postWithCreatorDB = yield this.postDatabase
                .findPostsWithCreatorById(idToLikeDislike);
            if (!postWithCreatorDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const userId = postload.id;
            const likeSQLite = like ? 1 : 0;
            const likeDislikeDB = {
                user_id: userId,
                post_id: postWithCreatorDB.id,
                like: likeSQLite
            };
            const post = new Post_1.Post(postWithCreatorDB.id, postWithCreatorDB.content, postWithCreatorDB.likes, postWithCreatorDB.dislikes, postWithCreatorDB.created_at, postWithCreatorDB.update_at, postWithCreatorDB.creator_id, postWithCreatorDB.creator_name);
            const likeDislikesExists = yield this.postDatabase.findLikeDislike(likeDislikeDB);
            if (likeDislikesExists === types_1.POST_LIKE.ALREADY_LIKED) {
                if (like) {
                    yield this.postDatabase.removeLikeDislike(likeDislikeDB);
                }
                else {
                    yield this.postDatabase.updateLikeDislike(likeDislikeDB);
                    post.removeLike();
                    post.addDislike();
                }
            }
            else if (likeDislikesExists === types_1.POST_LIKE.ALREADY_DISLIKED) {
                if (like) {
                    yield this.postDatabase.updateLikeDislike(likeDislikeDB);
                    post.removeDislike();
                    post.addLike();
                }
                else {
                    yield this.postDatabase.updateLikeDislike(likeDislikeDB);
                    post.removeLike();
                }
            }
            else {
                yield this.postDatabase.likeOrDislikePost(likeDislikeDB);
                like ? post.addLike() : post.addDislike();
            }
            const updatePostDB = post.toDBModel();
            yield this.postDatabase.update(idToLikeDislike, updatePostDB);
        });
    }
}
exports.PostBussiness = PostBussiness;
//# sourceMappingURL=PostBussiness.js.map