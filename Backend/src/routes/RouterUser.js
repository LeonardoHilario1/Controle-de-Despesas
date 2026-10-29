import UserController from "../controller/UserController.js"
import { Router } from "express"
import { validarUSerZod } from "../middleware/validationZod.js"

const router=Router()

router.post("/user/create",validarUSerZod,UserController.createUserController)
router.post("/user/login",UserController.loginController)
export default router