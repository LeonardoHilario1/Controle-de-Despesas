import express from "express";
import 'dotenv/config'
import cors from 'cors'
import userRoutes from './src/routes/RouterUser.js';
import despesasRoutes from './src/routes/RouterTransaction.js';
import summaryIa from "./src/routes/RouterIaGeneration.js"

const app=express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use('/api', userRoutes,despesasRoutes,summaryIa);



const PORT=5000

app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})