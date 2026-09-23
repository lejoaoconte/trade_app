# CLAUDE.md

## Portas

| Serviço                   | Porta | Endereço              |
| ------------------------- | ----- | --------------------- |
| Backend (API Express)     | 3010  | http://localhost:3010 |
| Frontend (React/Vite)     | 5173  | http://localhost:5173 |
| Banco de dados (Postgres) | 5432  | localhost:5432        |

## Backend

Executado a partir da raiz do projeto. Todos os scripts estão no
[package.json](package.json).

```bash
# Instalar dependências
yarn install

# Rodar em modo desenvolvimento (watch)
yarn dev

# Rodar em modo produção
yarn start
```

## Frontend (React)

Executado a partir de [frontend/react](frontend/react). Os scripts estão no
[frontend/react/package.json](frontend/react/package.json).

```bash
cd frontend/react

# Instalar dependências
yarn install

# Rodar em modo desenvolvimento (http://localhost:5173)
yarn dev

# Build de produção
yarn build

# Servir o build de produção
yarn preview
```

## Banco de dados (migrações)

O banco é PostgreSQL rodando em `localhost:5432` (usuário `postgres`, senha
`postgres`, database `postgres`). As credenciais podem ser sobrescritas por
variáveis de ambiente (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`,
`DB_NAME`) — veja [db/config.ts](db/config.ts).

```bash
# Subir uma instância do Postgres via Docker (exemplo)
docker run --name trade-app-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# Aplicar as migrações (executa todos os .sql em db/migrations)
yarn migrate
```

## Testes

As regras de automação de testes estão na skill
[writing-tests](.claude/skills/writing-tests/SKILL.md). **Essa skill é a
referência oficial para escrever e revisar testes** e é carregada
automaticamente pela LLM sempre que qualquer código novo for criado ou
modificado.

### Testes unitários e de integração (Vitest)

Executados a partir da raiz do projeto.

```bash
# Rodar todos os testes (modo watch)
yarn test

# Rodar os testes com relatório de cobertura
yarn test:coverage
```

> Os testes de integração ([test/integration](test/integration)) esperam a API
> rodando em http://localhost:3010 e o banco com as migrações aplicadas. Suba o
> backend (`yarn dev`) e rode `yarn migrate` antes de executá-los.

O relatório de cobertura é gerado na pasta [coverage](coverage). Abra
[coverage/index.html](coverage/index.html) no navegador para visualizá-lo.

### Testes E2E (Playwright)

Executados a partir de [e2e](e2e). Exigem o backend (porta 3010) e o frontend
(porta 5173) em execução.

```bash
cd e2e

# Instalar dependências
yarn install

# Instalar os navegadores do Playwright (primeira vez)
npx playwright install

# Rodar os testes end-to-end
npx playwright test
```
