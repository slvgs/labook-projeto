import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostOutputDTO, GetPostsInputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostWithCreatorDB, USER_ROLE } from "../types";




export class PostBussiness {
    constructor(
        private postDatabase: PostDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator

    ) { }




    public getPosts = async (
        input: GetPostsInputDTO
    ): Promise<GetPostOutputDTO> => {
        const { token } = input


        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const postload = this.tokenManager.getPayload(token)


        if (postload === null) {
            throw new BadRequestError("token inválido")
        }

        const postsWithCreatorDB: PostWithCreatorDB[] =
            await this.postDatabase
                .getPostsWithCreators()




        const posts = postsWithCreatorDB.map((postWithCreatorDB) => {
            const post = new Post(
                postWithCreatorDB.id,
                postWithCreatorDB.content,
                postWithCreatorDB.likes,
                postWithCreatorDB.dislikes,
                postWithCreatorDB.created_at,
                postWithCreatorDB.update_at,
                postWithCreatorDB.creator_id,
                postWithCreatorDB.creator_name
            )

            return post.toBussinesModel()
        })


        const output: GetPostOutputDTO = posts

        return output
    }




    public createPosts = async (
        input: CreatePostInputDTO
    ): Promise<void> => {
        const { token, content } = input


        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const postload = this.tokenManager.getPayload(token)

        if (postload === null) {
            throw new BadRequestError("token inválido")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }


        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updateAt = new Date().toISOString()
        const creatorId = postload.id
        const creatorContent = postload.content

        const post = new Post(
            id,
            content,
            0,
            0,
            createdAt,
            updateAt,
            creatorId,
            creatorContent


        )

        const postDB = post.toDBModel()

        await this.postDatabase.insert(postDB)


    }

    public editPost = async (input: EditPostInputDTO): Promise<void> => {
        const { idToEdit, token, content } = input


        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const postload = this.tokenManager.getPayload(token)

        if (postload === null) {
            throw new BadRequestError("token inválido")

        }

        if (typeof content !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        const postDB = await this.postDatabase.findById(idToEdit)


        if (!postDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorId = postload.id

        if (postDB.creator_id !== creatorId) {
            throw new BadRequestError("somente quem criou a playlist pode editá-la")
        }

        const creatorContent = postload.content



        const post = new Post(

            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.update_at,
            creatorId,
            creatorContent
            

        )

        post.setContent(content)
        post.setUpdateAt(new Date().toISOString())
        
        const updatePostDB = post.toDBModel()

        await this.postDatabase.update(idToEdit, updatePostDB)
    }



    public deletePosts = async (
        input: DeletePostInputDTO
    ): Promise<void> =>{
        const {idToDelete, token} = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const postload = this.tokenManager.getPayload(token)

        if (postload === null) {
            throw new BadRequestError("token inválido")
        }

        const postDB = await this.postDatabase.findById(idToDelete)


        if (!postDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorId = postload.id

        if(postload.role !== USER_ROLE.ADMIN && postDB.creator_id !== creatorId){
            throw new BadRequestError("somente quem criou a playlist pode deletá-la")
        }

        await  this.postDatabase.delete(idToDelete)




    }


   




}