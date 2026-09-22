import UserService from '../services/LoginService.js'

class UserController {
    async createUserController(req, res) {
        try {
            const dataUser = req.body
            const createdUser = await UserService.createLogin(dataUser)
            res.status(200).send(createdUser)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async loginController(req, res) {
        try {
            const dataUser = req.body
            const validation = await UserService.loginValidation(dataUser.email, dataUser.password)
            res.status(200).send(validation)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

   


}

export default new UserController()