import { PostBussiness } from "../bussiness/PostBussiness";
import { Request, Response } from "express";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostsInputDTO, LikeOrDislikeInputDTO } from "../dtos/userDTO";
import { BaseError } from "../error/BaseError";
import { BadRequestError } from "../error/BadRequestError";





export class PostController{
    constructor(
        private postBussiness: PostBussiness
    ){}


    public getPosts = async (req: Request, res: Response) => {

        try {

            const input: GetPostsInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.postBussiness.getPosts(input)

            res.status(200).send(output)




            
        }  catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado")
            }
            
        }
    }


    public createPosts = async(req: Request, res: Response) => {
        try {

            const input: CreatePostInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.postBussiness.createPosts(input)

            res.status(201).send("Post criado com sucesso")


            
        } catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado")
            }
            
        }
    }


    public editPost = async (req: Request, res: Response) => {
        try {   

            const input: EditPostInputDTO = {
                idToEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }

            await this.postBussiness.editPost(input)

            res.status(200).send("Post editado com sucesso")






            
        } catch (error) {

            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
    }


    public deletePost = async (req: Request, res: Response) => {
        try {

            const input: DeletePostInputDTO ={
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            await this.postBussiness.deletePosts(input)

            res.status(200).send("Post deletado com sucesso")


            
        } catch (error) {

            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
    }



    public likeOrDislikePost = async (req: Request, res: Response) => {
        try {

            const input: LikeOrDislikeInputDTO = {
                idToLikeDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }

            await this.postBussiness.likeOrDislikePosts(input)

            res.status(200).end()





            
        } catch (error) {

            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
    }
  



}