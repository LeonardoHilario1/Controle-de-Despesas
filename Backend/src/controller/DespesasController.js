import DespesasService from "../services/DespesasService.js";

class DespesasController {
    async findAllController(req, res) {
        try {
            const userId = req.user.id;

            const transaction = await DespesasService.findTransactions(userId)
            res.status(200).json(transaction)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async findCategoryController(req, res) {
        try {
            const { categoryUrl } = req.params
            const userId = req.user.id;

            const category = await DespesasService.findCategory(categoryUrl,userId)
            res.status(200).json(category)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async findTypeController(req, res) {
        try {
            const { typeUrl } = req.params
            const userId = req.user.id;

            const type = await DespesasService.findType(typeUrl,userId)
            res.status(200).json(type)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async createTransactionController(req, res) {
        try {
            const createData = req.body
            const userId = req.user.id;

            const dataTransaction = await DespesasService.createTransaction(createData,userId)
            res.status(200).json(dataTransaction)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async editTransactionController(req,res){
        try{
            const {id}=req.params
            const data=req.body
            const userId = req.user.id;

            const editTransaction= await DespesasService.editTransaction(id,data,userId)
            res.status(200).json(editTransaction)
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }

    async deleteTransactionController(req,res){
        try{
            const {id}=req.params
            const userId = req.user.id;

            const deleteTransaction= await DespesasService.deleteTransaction(id,userId)
            res.status(200).send("Despesa Removida!")
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

export default new DespesasController()