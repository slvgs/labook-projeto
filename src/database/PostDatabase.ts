import { LikeDislikeDB, PostDB, PostWithCreatorDB, POST_LIKE } from "../types";
import { BaseDatabase } from "./basedatabase";




export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "like_dislikes"


    public getPostsWithCreators = async(): Promise<PostWithCreatorDB[]> => {
        const result: PostWithCreatorDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            "posts.id",
            "posts.creator_id",
            "posts.content",
            "posts.likes",
           " posts.dislikes",
            "posts.created_at",
            "posts.update_at",
            "users.name AS creator_name"
        )
        .join("users", "posts.creator_id", "=", "users.id")
        
        return result
    }





    public insert = async(postDB: PostDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
    }


    public findById = async(id: string): Promise<PostDB | undefined> => {
        const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id})

        return result[0]
    }

    public update = async(id: string, postDB: PostDB): Promise<void > => {
         await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(postDB)
        .where({id})

        
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .delete()
        .where({id})
    }


    public findPostsWithCreatorById = async(postId: string): Promise<PostWithCreatorDB | undefined> => {
        const result: PostWithCreatorDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            "posts.id",
            "posts.creator_id",
            "posts.content",
            "posts.likes",
           " posts.dislikes",
            "posts.created_at",
            "posts.update_at",
            "users.name AS creator_name"
        )
        .join("users", "posts.creator_id", "=", "users.id")
        .where("posts.id", postId)
        
        return result[0]
    }


    public likeOrDislikePost = async (
        likeDislike: LikeDislikeDB
    ): Promise<void> =>{
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .insert(likeDislike)
    }


    public findLikeDislike = async (
        likeDislikeFind: LikeDislikeDB
    ): Promise<POST_LIKE | null> => {
        const [likeDislikeDB]: LikeDislikeDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
            user_id: likeDislikeFind.user_id,
            post_id: likeDislikeFind.post_id
        })

        if(likeDislikeDB){
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        }else{
            return null
        }
    }


    public removeLikeDislike = async (
        likeDislikeDB: LikeDislikeDB

    ):Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }


    public updateLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ) => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .update(likeDislikeDB)
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id

        })
    }










}