export enum USER_ROLE{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}


export interface TokenPostLoad{
    id: string, 
    name: string, 
    role: USER_ROLE
}



export interface PostModel {
    
        id: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
        creator: {
            id: string
            name: string
        }
    
}


export interface PostDB{

    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    update_at: string
}


export interface PostWithCreatorDB extends PostDB{
    creator_name: string
}


export interface UserDB{

    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLE,
    created_at: string 
    
}


export interface UserModel{

    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLE,
    createdAt: string 
    
}



export interface LikeDislikeDB {
    user_id: string,
    post_id: string,
    like: number
}

export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

