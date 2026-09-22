import DespesasController from "../controller/DespesasController.js"
import UserController from "../controller/UserController.js"
import verificarToken from "../middleware/auth.middleware.js"

import { Router } from "express"

const router=Router()

router.get("/transaction/all",verificarToken,DespesasController.findAllController)
router.get('/transaction/category/:categoryUrl',verificarToken,DespesasController.findCategoryController)
router.get('/transaction/type/:typeUrl',verificarToken,DespesasController.findTypeController)
router.post('/transaction/create',verificarToken,DespesasController.createTransactionController)
router.put('/transaction/edit/:id',verificarToken,DespesasController.editTransactionController)
router.delete('/transaction/delete/:id',verificarToken,DespesasController.deleteTransactionController)

export default router