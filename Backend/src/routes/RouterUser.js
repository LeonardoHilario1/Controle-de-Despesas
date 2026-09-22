import UserController from "../controller/UserController.js"
import { Router } from "express"


const router=Router()

router.post("/user/create",UserController.createUserController)
router.post("/user/login",UserController.loginController)
export default router