# Teceo Challenge 🧩

Aplicação fullstack para gerenciamento de itens, desenvolvida como desafio técnico para a Teceo. Permite listar, editar, selecionar e realizar ações em massa com itens, além de exportar para CSV.

---

## Tecnologias

* **Frontend:** React (Vite + TypeScript + Material UI)
* **Backend:** NestJS (TypeScript)
* **Banco de dados:** PostgreSQL
* **ORM:** TypeORM
* **Containerização:** Docker & Docker Compose
* **Extras:** React Query, PapaParse (CSV), arquitetura modular

---

## Funcionalidades

- **Listagem com scroll infinito**  
  Itens são carregados dinamicamente ao rolar a tabela.
- **Seleção múltipla de itens**  
  Permite selecionar um ou mais itens para ação em massa.
- **Ação em massa (bulk)**  
  Permite editar campos em todos os itens selecionados de uma vez, via modal de confirmação.
- **Edição inline**  
  Edição de qualquer item diretamente na tabela, sem sair da tela.
- **Modal de prévia antes do bulk**  
  Confirmação e visualização dos itens que serão alterados em massa.
- **Exportação CSV**  
  Exporta itens selecionados para CSV, pronto para Excel/Google Sheets.
- **Feedback visual**  
  Loaders, snackbars e bloqueio de botões enquanto as ações estão em andamento.
- **Tema escuro/claro**

---

## Pré-requisitos

- **Docker** e **Docker Compose**
- (Opcional) Node.js 18+ se rodar fora dos containers

---

## Executando localmente com Docker

```bash
git clone <repo-url>
cd <repo-dir>
docker-compose up --build

Frontend: http://localhost:4173

Backend: http://localhost:3000

Banco: localhost:5432 (usuário/senha definidos no .env)

ℹ️ Observação:
Na primeira execução, o Docker precisará baixar as imagens base e instalar dependências do zero.
Esse processo pode levar de 3 a 5 minutos, dependendo da sua conexão e máquina.

Nas execuções seguintes, como as imagens já estarão em cache, a aplicação sobe em poucos segundos.