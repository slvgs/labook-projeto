import { UserDB } from "../types";
import { BaseDatabase } from "./basedatabase";


export class UserDataBase extends BaseDatabase{
    public static TABLE_USERS = "users"


    public insert = async (userDB: UserDB) => {

        await BaseDatabase
        .connection(UserDataBase.TABLE_USERS)
        .insert(userDB)

    }

    //continuar a lógica de user no DB
}