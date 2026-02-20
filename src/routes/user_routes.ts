import { Router } from "express";
import { UserRepository } from "../modules/users/repositories/UserRepository.js";

const userRoutes = Router()
const userRepository = new UserRepository()


userRoutes.post('/sign-up', (request, response) => { // Cadastro de usuário 
  userRepository.create(request, response)
})

userRoutes.post('/sign-in', (request, response) => { // Login de usuário
    userRepository.login(request, response)
})

export { userRoutes }
