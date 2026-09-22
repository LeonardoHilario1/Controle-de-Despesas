import { prisma } from "../prismaClient.js";

class DespesasService{
    async findTransactions(userId){
        return await prisma.transaction.findMany({where:{userId:userId}})
    }

    async findCategory(category,userId){
        return await prisma.transaction.findMany({
            where:{category:category,userId:userId}
        })
    }
    async findType(type,userId){
        return await prisma.transaction.findMany({
            where:{type:type,userId:userId},
        })
    }

    async findData(date,userId){
        return await prisma.transaction.findMany({
            where:{date:date,userId:userId}
        })
    }

    //CRUD
    async createTransaction(data,userId){
        return await prisma.transaction.create({data:{ ...data,userId:userId}
        })
    }

    async editTransaction(id,data,userId){
        return await prisma.transaction.update({
            where:{id:id,userId:userId},
            data:data
        })
    }

    async deleteTransaction(id,userId){
        return await prisma.transaction.delete({
            where:{id:id,userId:userId}
        })
    }
}

export default new DespesasService()