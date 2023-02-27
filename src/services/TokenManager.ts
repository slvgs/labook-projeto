import { TokenPostLoad } from "../types";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()




export class TokenManager{

    public createToken = (postload: TokenPostLoad): string => {
          
            const token = jwt.sign(
                postload,
                process.env.JWT_KEY as string,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            )

            return token

    }

    public getPayload = (token: string): TokenPostLoad | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload as TokenPostLoad
        
				// se a validação falhar, um erro é disparado pelo jsonwebtoken
				// nós pegamos o erro aqui e retornamos null para a Business saber que falhou
				} catch (error) {
            return null
        }
    }
}

