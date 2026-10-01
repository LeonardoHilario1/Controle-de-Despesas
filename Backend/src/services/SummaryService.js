import { prisma } from "../prismaClient.js";
import Anthropic from "@anthropic-ai/sdk";

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function IaGeneration(transactions, userId) {
    try {
        const response = await ai.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 2048,
            messages: [{
                role: "user",
                content: `
GOAL:
Gerar um resumo financeiro personalizado com base no controle de despesas do usuário, trazendo dicas de mercado financeiro e orientações práticas sobre o que seria mais adequado fazer diante do cenário apresentado.

OUTPUT:
Retorne apenas um texto corrido (string), sem markdown, sem listas numeradas, sem títulos — parágrafos diretos e de fácil leitura.

AUDIENCE:
Usuários adultos, jovens e idosos, com diferentes níveis de conhecimento financeiro, que estão buscando organizar e entender melhor suas próprias despesas. Use linguagem simples e acessível, evitando termos técnicos de mercado financeiro sem explicação.

LENGTH/DETAIL:
Um texto detalhado (3 a 5 parágrafos), analisando os dados reais enviados abaixo — categorias com maior gasto, proporção entre receita e despesa, e padrões que se destacam — e finalizando com sugestões práticas e realistas.

IMPORTANTE: Este resumo é educativo e não substitui orientação de um profissional certificado (CFP, economista). Inclua essa ressalva de forma natural no texto, sem soar como aviso legal engessado.

DADOS DO USUÁRIO:
${JSON.stringify(transactions)}
`,
            }],
        });
        const textBlock = response.content.find((block) => block.type === "text");
        return await createIaGenerations(textBlock?.text ?? "", userId)
    } catch (error) {
        throw error
    }

}


export async function createIaGenerations(text,userId) {
    return await prisma.iAgeneration.upsert({
        where: { userId:userId},
        update: { text: text },
        create: { text:text,userId:userId }
    });
}


export async function findSummary(userId) {
    return await prisma.iAgeneration.findUnique({where:{userId:userId}})
}
