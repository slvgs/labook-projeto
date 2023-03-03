import { PostModel } from "../types"



//DTO é uma ponte para entradas e saidas, com valores "burros", para ser "customizado" na regra de negócio; 



export interface SingupInputDTO{
    name:unknown,
    email:unknown,
    password:unknown
}

export interface SingupOutputDTO{
    token: string
}


export interface LoginInputDTO{
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO{
    token: string
}

export interface GetPostsInputDTO{
    token: string | undefined
}

export type GetPostOutputDTO = PostModel[]

export interface CreatePostInputDTO{
    token: string | undefined
    content: unknown
}

export interface EditPostInputDTO{
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePostInputDTO{
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikeInputDTO{
    idToLikeDislike: string,
    token: string | undefined,
    like: unknown
}

