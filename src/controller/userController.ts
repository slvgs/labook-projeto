import { Request, Response } from "express"
import { UserBussiness } from "../bussiness/userBussiness"
import { SingupInputDTO, SingupOutputDTO } from "../dtos/userDTO"
import { BaseError } from "../error/BaseError"


export class UserController {
    constructor(
        private userBussiness: UserBussiness
    ) {}


        public signup = async (req: Request, res: Response) => {



            try {

                const input: SingupInputDTO = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password

                }


                const output = await this.userBussiness.signup(input)
                

                res.status(201).send(output)
            } catch (error) {

                if(error instanceof BaseError ){
                    res.status(error.statusCode).send(error.message)
                }else{
                    res.status(500).send("Erro inesperado")
                }
                
            }
        }

    }