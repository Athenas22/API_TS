# API RESTful - Desafio Backend

---

##  Pré-requisitos que serão necessários

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:
* **Node.js** (versão 18.x ou superior)
* **npm** (geralmente instalado com o Node.js)

---

## Como Configurar e Instalar

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

1 - Clonar o Repositório

git clone https://github.com/Athenas22/API_TS
cd API_TS

2 - Execute o comando abaixo para instalar todas as dependências listadas no package.json:

**npm install**

3-  Adicione o .env

Este projeto requer um arquivo .env na raiz para as variáveis de ambiente.

Crie um arquivo chamado .env na pasta principal do projeto e adicione as seguintes variáveis, substituindo os valores conforme necessário:

# URL de conexão para o banco de dados SQLite
DATABASE_URL="file:./dev.db"

# Chave secreta para a assinatura dos tokens JWT.
JWT_SECRET="pode-colocar-aqui-a-chave-que-quiser"

4- Executar a Migração do Banco de Dados

Este comando utilizará o Prisma para criar o banco de dados SQLite e aplicar o schema definido, criando as tabelas necessárias.

**npx prisma migrate dev**

5 - Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento com recarregamento automático, execute o seguinte comando:

**npm run dev**

Após a execução, o servidor estará disponível no endereço http://localhost:3000 (ou na porta definida em seu ambiente).