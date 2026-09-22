import { prisma } from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

class UserService {
    async createLogin(dados) {
        const senhaHasheada = await bcrypt.hash(dados.password, 10)
        const usuarioCriado = await prisma.user.create({
            data: {
                name: dados.name,
                email: dados.email,
                password: senhaHasheada
            }
        })

        const { password, ...usuarioSemSenha } = usuarioCriado
        return usuarioSemSenha
    }

    async loginValidation(email, senha) {
        const usuarioEncontrado = await prisma.user.findUnique({ where: { email: email } })

        if (!usuarioEncontrado) {
            throw new Error("Credenciais Inválidas")
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.password)

        if (!senhaCorreta) {
            throw new Error("Credenciais Inválidas")
        }

        const token = jwt.sign(
            { id: usuarioEncontrado.id, email: usuarioEncontrado.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        const { password, ...usuarioSemSenha } = usuarioEncontrado

        return { token, usuarioSemSenha }
    }
}

export default new UserService()