import { User } from "../models/User";
import { UserDB } from "../types";
import { BaseDatabase } from "./basedatabase";


export class UserDataBase extends BaseDatabase{
    public static TABLE_USERS = "users"


    public insert = async (userDB: UserDB): Promise<void> => {

        await BaseDatabase
        .connection(UserDataBase.TABLE_USERS)
        .insert(userDB)

    }


    public findEmail = async (email: string) => {

        const result: UserDB[] | undefined[] = await BaseDatabase
        .connection(UserDataBase.TABLE_USERS)
        .select()
        .where({email})


        return result[0]

    }

    //continuar a lógica de user no DB
}