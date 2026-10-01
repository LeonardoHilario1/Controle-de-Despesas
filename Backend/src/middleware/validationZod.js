import { z } from 'zod'

const userSchema=z.object({
    name:z.string({required_error:"O nome é obrigatório"}).min(1,"O nome nao pode estar vazio"),
    email:z.email({required_error:"EMail inválido"}),
    password:z.string({required_error:"Numeros de caractere invalidos"}).min(5,"Minimo 5 caracteres!")

})

const despesasSchema=z.object({
    amount:z.coerce.number({required_error:"Apenas Numeros!"}),
    category:z.string({required_error:"preencher Categoria obrigatório"}).min(1,"minimo de 1 caracteres"),
    description:z.string().optional(),
    type:z.enum(["INCOME","EXPENSE"],{
        errorMap:()=>({message:"Tipo deve ser INCOME ou EXPENSE"})
    })


})

export function validarDespesasZod(req,res,next){
    try{
        const validacao=despesasSchema.safeParse(req.body)

        if(!validacao.success){
            const errosFormatados=validacao.error.format()
            return res.status(400).json({
                error:"Dados invalidos",
                detalhes:errosFormatados
            })
        }
        next()
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


export function validarUSerZod(req,res,next){
    try{
        const validacao=userSchema.safeParse(req.body)

        if(!validacao.success){
            const errosFormatados=validacao.error.format()
            return res.status(400).json({
                error:"Dados invalidos",
                detalhes:errosFormatados
            })
        }

        next()
    }catch(error){
        res.status(500).json({error:error.message})
    }
}