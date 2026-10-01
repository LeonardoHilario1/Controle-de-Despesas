import { Router } from "express";
import verificarToken from "../middleware/auth.middleware.js";
import SummaryController from "../controller/SummaryController.js";

const router=Router()

router.post('/IaGenerations/output',verificarToken,SummaryController.createsummaryController)
router.get("/IaGenerations/summary",verificarToken,SummaryController.getSummaryController)
export default router