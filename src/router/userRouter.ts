import express from 'express'
import { UserBussiness } from '../bussiness/userBussiness'
import { UserController } from '../controller/userController'
import { UserDataBase } from '../database/UserDataBase'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'







export const userRouter = express.Router()

const userController = new UserController(new UserBussiness(
    new UserDataBase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
))


userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)