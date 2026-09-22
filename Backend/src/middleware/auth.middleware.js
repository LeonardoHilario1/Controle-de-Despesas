import jwt from 'jsonwebtoken'


function verificarToken(req,res,next){
    try{
        const authHeader= req.headers.authorization

        if(!authHeader){
            return res.status(401).json({error:"Token nao fornecido"})
        }
        

        const token=authHeader.split(' ')[1]

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded

        next()
    }catch(error){
        return res.status(401).json({error:"Token invalidos ou expirado"})
    }
}

export default verificarToken