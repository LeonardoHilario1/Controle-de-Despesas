# Controle de Despesas Pessoais

Aplicação full stack para controle de despesas e receitas pessoais, com autenticação de usuários e geração de resumos financeiros por IA.

## Funcionalidades

- **Autenticação de usuários**: cadastro e login com senha criptografada (bcrypt) e sessão via JWT.
- **Controle de transações**: criação, edição, exclusão e listagem de despesas e receitas (CRUD completo).
- **Totais automáticos**: cálculo em tempo real do total de despesas e de receitas.
- **Sessão persistente**: login mantido entre recarregamentos de página (localStorage).
- **Resumo financeiro com IA**: geração de um resumo personalizado das despesas do usuário usando a API da Anthropic (Claude), com orientações práticas sobre o cenário financeiro apresentado.

## Tecnologias

**Frontend**
- React
- React Router
- React Hook Form

**Backend**
- Node.js + Express (ESM)
- Prisma ORM
- SQLite
- JWT (`jsonwebtoken`) para autenticação
- bcrypt para hash de senhas
- API da Anthropic (Claude) para geração dos resumos financeiros

## Arquitetura

O backend segue uma arquitetura em camadas:

```
rotas       → mapeiam URL + método para um controller, e definem quais middlewares passam antes
middleware  → intercepta a requisição, valida algo (ex: token), libera ou barra
controller  → lida com req/res, chama o service, formata a resposta HTTP
service     → lida com o banco de dados (Prisma), sem conhecimento de req/res
```

Cada entidade (usuário, transação, resumo de IA) tem seu próprio service e controller, mantendo as responsabilidades separadas.

## Modelo de dados

- **User**: id, name, email (único), password (hash), createdAt
- **Transaction**: id, type (`INCOME` | `EXPENSE`), amount, category, description, date, vinculada a um `User` via `userId`
- **IAgeneration**: id, text (resumo gerado), userId (único — um resumo por usuário, atualizado a cada nova geração), date

## Autenticação

1. No cadastro, a senha é hasheada com bcrypt antes de ser salva.
2. No login, a senha informada é comparada com o hash salvo; se válida, um token JWT é gerado contendo o `id` do usuário.
3. O frontend guarda esse token (localStorage) e o envia em toda requisição protegida, no header `Authorization: Bearer <token>`.
4. Um middleware (`verificarToken`) decodifica o token em cada requisição protegida e disponibiliza o usuário autenticado em `req.user`.
5. Toda operação de escrita ou leitura de dados do usuário usa o `userId` extraído do token — nunca um valor vindo do corpo da requisição — para evitar que um usuário acesse ou altere dados de outro.

## Resumo financeiro com IA

Ao clicar em "Gerar Resumo com IA", o backend:

1. Busca todas as transações do usuário autenticado.
2. Monta um prompt estruturado (formato GOAL — Goal, Output, Audience, Length/Detail) com esses dados.
3. Envia o prompt para a API da Anthropic (Claude), pedindo um resumo em texto corrido, com linguagem acessível e uma observação de que o conteúdo é educativo, não substituindo orientação de um profissional certificado.
4. Salva (ou atualiza, caso já exista um resumo anterior) o texto gerado no banco, associado ao usuário.

O resumo salvo é exibido numa tela própria, buscado do banco a cada acesso — garantindo que ele sobreviva a atualizações de página.

## Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Uma chave de API da Anthropic ([console.anthropic.com](https://console.anthropic.com))

### Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta do backend:
```
JWT_SECRET="uma_string_longa_e_aleatoria"
DATABASE_URL="file:./dev.db"
ANTHROPIC_API_KEY="sua_chave_aqui"
```

Rode as migrations e inicie o servidor:
```bash
npx prisma migrate dev
node index.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Possíveis evoluções futuras

- Histórico de resumos gerados (em vez de manter apenas o mais recente)
- Filtros de período nas transações e nos resumos
- Migração do backend para TypeScript
