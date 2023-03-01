import { PostBussiness } from "../bussiness/PostBussiness";
import { Request, Response } from "express";
import { CreatePostInputDTO, DeletePostInputDTO, GetPostsInputDTO } from "../dtos/userDTO";
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

            res.status(201).end()


            
        } catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado")
            }
            
        }
    }

  



}