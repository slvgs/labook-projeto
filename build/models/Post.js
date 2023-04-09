"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, content, likes, dislikes, createdAt, updateAt, creatorId, creatorName) {
        this.id = id;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getCreatorId() {
        return this.creatorId;
    }
    setCreatorId(value) {
        this.creatorId = value;
    }
    getCreatorName() {
        return this.creatorName;
    }
    setCreatorName(value) {
        this.creatorName = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    addLike() {
        this.likes += 1;
    }
    removeLike() {
        this.likes -= 1;
    }
    addDislike() {
        this.dislikes += 1;
    }
    removeDislike() {
        this.dislikes -= 1;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getUpdateAt() {
        return this.createdAt;
    }
    setUpdateAt(value) {
        this.createdAt = value;
    }
    toDBModel() {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            update_at: this.updateAt
        };
    }
    toBussinesModel() {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updateAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        };
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map