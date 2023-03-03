import express from "express"
import { PostBussiness } from "../bussiness/PostBussiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"







export const postRouter = express.Router()

const postController = new PostController(
    new PostBussiness(
        new PostDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
)


postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPosts)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeOrDislikePost)

