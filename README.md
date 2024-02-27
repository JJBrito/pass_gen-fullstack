# pass_gen-fullstack
Projeto de aplicação responsiva para envio de senhas de por e-mail.

# Projeto Fullstack

Este é um projeto fullstack que consiste em um gerador de senha, com backend em Node.js usando Express e frontend em HTML, CSS e JavaScript.

## Arquitetura:

Projeto Fullstack/
│
├── Frontend/
│   ├── src/
│   │   ├── index.html
│   │   ├── index.js
│   │   └── style.css
│   └── src/
│       └── assets/
│           ├── adicionar-usuario.png
│           └── novo-email.png
│
├── controllers/
│   ├── usuario.js
│   └── util.js
│
├── node_modules/
│   └── (dependências do projeto)
│
├── routes/
│   └── usuarios.js
│
├── DDL.sql
├── db.js
├── package.json
├── package-lock.json
├── README.md
├── reset.css
├── server.js
└── .env


O projeto é dividido em duas partes principais: backend e frontend.

### Backend

O backend do projeto é responsável por fornecer endpoints para gerar senhas aleatórias com base nos critérios fornecidos pelo usuário e armazenar os dados dos usuários em um banco de dados PostgreSQL.

#### Arquivos principais do backend:

- `server.js`: Arquivo principal que configura o servidor Express, define as rotas e inicia o servidor.
- `db.js`: Arquivo que configura a conexão com o banco de dados PostgreSQL.
- `usuario.js`: Arquivo de roteamento que define as rotas para manipular os dados dos usuários.
- `util.js`: Arquivo que contém funções utilitárias, como a função para gerar senhas aleatórias.

### Frontend

O frontend do projeto é uma página HTML simples que permite ao usuário fornecer informações para gerar uma senha personalizada.

#### Arquivos principais do frontend:

- `index.html`: Arquivo HTML que contém o formulário para inserir os dados do usuário.
- `index.js`: Arquivo JavaScript que lida com a interação do usuário e envia os dados para o backend.
- `style.css`: Arquivo CSS que estiliza a página HTML.

## Modo de instalação e funcionamento

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git


Este arquivo README.md fornece uma visão geral do projeto, detalhes sobre a arquitetura, modo de instalação e funcionamento, além de incluir o script SQL para criação da tabela de usuários. Certifique-se de substituir `seu-usuario/seu-repositorio` pelo seu nome de usuário e nome do repositório no GitHub.
