import { IaGeneration } from "../services/SummaryService.js";
import DespesasService from "../services/DespesasService.js";
import { findSummary } from "../services/SummaryService.js"

class SummaryController{
    async createsummaryController(req,res){
        try{
            const userId=req.user.id
            const buscarData= await DespesasService.findTransactions(userId) 
            const textOutput=await IaGeneration(buscarData,userId)
            res.status(200).json(textOutput)

        }catch(error){
            res.status(400).json({error:error.message})
        }
    }

    async getSummaryController(req,res){
        try{
            const userId=req.user.id
            const buscarData= await findSummary(userId)
            res.status(200).json(buscarData)
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

export default new SummaryController()