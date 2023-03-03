import { UserDataBase } from "../database/UserDataBase";
import { SingupInputDTO, SingupOutputDTO, LoginInputDTO, LoginOutputDTO} from "../dtos/userDTO";
import { User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenPostLoad, UserDB, USER_ROLE } from "../types";
import { TokenManager } from "../services/TokenManager";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";





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
            throw new BadRequestError("'name' deve ser string")

        }

        if(typeof email !== "string"){
            throw new BadRequestError("'email' deve ser string")

        }

        if(typeof password !== "string"){
            throw new BadRequestError("'password' deve ser string")

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


    public login = async (input: LoginInputDTO) => {
        const {email, password} = input
        


       

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        
        //validar no DB email
        const userDBCorrect = await this.userDataBase.findEmail(email)

        if(!userDBCorrect){
            throw new NotFoundError("'email' não cadastrado")
        }


        // const user = new User(
        //     userDBCorrect.id,
        //     userDBCorrect.email,
        //     userDBCorrect.name,
        //     userDBCorrect.password,
        //     userDBCorrect.role,
        //     userDBCorrect.created_at,
        // )

        // const validarPassword = user.getPassoword()



        const isPasswordCorrect = await this.hashManager
        .compare(password, userDBCorrect.password)


        if (isPasswordCorrect) {
            throw new BadRequestError("'password' incorreto")
        }



        if(userDBCorrect){

            const user = new User(
                userDBCorrect.id,
                userDBCorrect.email,
                userDBCorrect.name,
                userDBCorrect.password,
                userDBCorrect.role,
                userDBCorrect.created_at,
            )


            
        const postload: TokenPostLoad = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(postload)

        
        const output = { message: "Seu login foi realizado com sucesso", token}

        return output
        }else{
            const output = {message:"Dados incorretos!"}
            return output
        }


        
       

        

       

       




    }


 



}