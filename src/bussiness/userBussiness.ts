import { UserDataBase } from "../database/UserDataBase";
import { SingupInputDTO, SingupOutputDTO } from "../dtos/userDTO";
import { User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenPostLoad, USER_ROLE } from "../types";
import { TokenManager } from "../services/TokenManager";





export class UserBussiness{
    constructor(

        private userDataBase: UserDataBase, 
        private idGenerator: IdGenerator, 
        private tokenManager: TokenManager, 
        private hashManager: HashManager



    ){}


    public signup = async (input: SingupInputDTO): Promise<SingupOutputDTO> => {
        const {name, email, password} = input


        if(typeof name !== "string"){
            throw new Error("'name' deve ser string")

        }

        if(typeof email !== "string"){
            throw new Error("'email' deve ser string")

        }

        if(typeof password !== "string"){
            throw new Error("'password' deve ser string")

        }

        const id =  this.idGenerator.generate()
        const role = USER_ROLE.NORMAL


        const newUser = new User (
            id,
            name,
            email,
            password,
            role,
            new Date().toISOString()
        )

        const userDB = newUser.toDBModel()

        await this.userDataBase.insert(userDB)

        const postload: TokenPostLoad = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const output: SingupOutputDTO = {
            token: this.tokenManager.createToken(postload)
        }

        return output


    }
}