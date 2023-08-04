# VirtuAgenda-api 📱

## Descrição

A API-Restful VirtuAgenda possui como objetivo gerenciar os contatos de forma simplificada para o usuário.

## Funcionalidades

\*Cadastrar um novo usuário;

\*Realizar o login do usuário;

\*Realizar a atualização das informações do usuário logado;

\*Realizar a exclusão da conta do usuário logado;

\*Cadastrar novas informações do usuário logado, como um novo email e/ou um novo telefone;

\*Realizar a atualização das novas informações;

\*Realizar a exclusão das novas informações;

\*Cadastrar novos contatos;

\*Realizar a atualização dos contatos;

\*Realizar a exclusão dos contatos;

\*Listar todos os contatos de um usuário.

## Ferramentas utilizadas

\*Nodejs;

\*Express;

\*TypeORM;

\*Typescript;

\*Pg;

\*Dotenv;

\*Zod;

\*Bcryptjs;

\*Jsonwebtoken;

\*reflect-metadata;

\*express-async-errors;

\*PostgreSQL.

## Para utilizar essa aplicação:

Para esse projeto foi utilizado o gerenciador de pacotes npm, na sua versão 9.6.2.

Sendo assim para inicializar esta aplicação é necessário realizar o seguinte comando para instalar todas as dependências do projeto:

```
npm install
```

Assim como, para essa aplicação foi utilizado o banco de dados PostgreSql, sendo assim é necessário realizar uma cópia do arquivo <b>.env.example</b>, renomeá-la para <b>.env</b> e trocar os dados presentes na DATABASE-URL para os seus dados.

Antes de rodar a aplicação, também é necessário rodar todas as migrações da aplicação para o banco de dados:

```
npm run typeorm migration:run -- -d src/data-source.ts
```

Por fim, para rodar o projeto:

```
npm run dev
```

# Rotas

## Rotas que não precisam de autorização

<h2>Cadastro de usuário</h2>

`POST -> /users`

```json
{
  "name": "Ju Duarte",
  "password": "Julia1234",
  "image": "imgurl",
  "email": "ju@mail.com",
  "phone": "1412345678"
}
```

Resposta - status 201

```json
{
  "id": "849bae57-f9e8-43e9-83ba-75fe1a8183f9",
  "name": "Ju Duarte",
  "image": "imgurl",
  "details": [
    {
      "id": "fc449138-d4df-40b0-a5a9-a8611440f711",
      "email": "ju@mail.com",
      "phone": "1234-5678",
      "contactTitle": "Ju Duarte: Main Information"
    }
  ],
  "addedAt": "2023-07-27"
}
```

Resposta - status 409

```json
{
  "message": "Email already exists"
}
```

OU

```json
{
  "message": "Phone already exists"
}
```

<h2>Login do usuário</h2>

`POST -> /login`

```json
{
  "email": "ju@mail.com",
  "password": "Julia1234"
}
```

Resposta - status 200

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1QG1haWwuY29tIiwiaWF0IjoxNjkwNjUxMzMyLCJleHAiOjE2OTA3Mzc3MzIsInN1YiI6Ijg0OWJhZTU3LWY5ZTgtNDNlOS04M2JhLTc1ZmUxYTgxODNmOSJ9.k8C-S9jFmIk_1zYZwuTZ0zJLAQ8qxz_UZ-EkpVPhDWw",
  "user": {
    "id": "849bae57-f9e8-43e9-83ba-75fe1a8183f9",
    "name": "Ju Duarte",
    "password": "$2a$10$2LrgsEeOBrJkuvEG7VkRnu9VxwSXoPsRx9ZPmXR83umfPeRswXb3u",
    "image": "imgurl",
    "addedAt": "2023-07-27"
  }
}
```

Resposta - status 401

```json
{ "message": "Invalid credentials" }
```

## Rotas que precisam de autorização

<h2>Buscar usuário logado</h2>

`GET -> /users/:id`

Resposta - status 200

```json
{
  "id": "849bae57-f9e8-43e9-83ba-75fe1a8183f9",
  "name": "Ju Duarte",
  "image": "imgurl",
  "details": [
    {
      "id": "fc449138-d4df-40b0-a5a9-a8611440f711",
      "email": "ju@mail.com",
      "phone": "1234-5678",
      "contactTitle": "Ju Duarte: Main Information"
    }
  ],
  "addedAt": "2023-07-27"
}
```

Resposta - status 404

```json
{
  "message": "User not found"
}
```

<h2>Editar usuário logado</h2>

`PATCH -> /users/:id`

```json
{
  "name": "Julia Duarte"
}
```

Resposta - status 200

```json
{
  "id": "5292e764-f173-4f4c-ab5f-b80421ceda8d",
  "name": "Julia Duarte",
  "image": "https://i0.statig.com.br/bancodeimagens/89/40/50/894050oomjqwfqtbhh4rditno.jpg",
  "details": [
    {
      "id": "a15480a4-d7db-406e-aebe-8d983e0ec7d5",
      "email": "julia_otomoduarte@outlook.com",
      "phone": "14998150263",
      "contactTitle": "Julia Otomo Duarte: Main Information"
    }
  ],
  "addedAt": "2023-07-29"
}
```

Resposta - status 404

```json
{
  "message": "User not found"
}
```

<h2>Excluir usuário logado</h2>

`DELETE -> /users/:id`

Não possui corpo de requisição e nem de resposta.

Resposta - status 404

```json
{
  "message": "User not found"
}
```

<h2>Criar nova informação para o usuário</h2>

`POST -> /users/:id/details`

```json
{
  "email": "juju@mail.com",
  "phone": "1111-1111",
  "contactTitle": "contato 2"
}
```

Resposta - status 201

```json
{
  "id": "5292e764-f173-4f4c-ab5f-b80421ceda8d",
  "name": "Julia Duarte",
  "image": "https://i0.statig.com.br/bancodeimagens/89/40/50/894050oomjqwfqtbhh4rditno.jpg",
  "details": [
    {
      "id": "a15480a4-d7db-406e-aebe-8d983e0ec7d5",
      "email": "julia_otomoduarte@outlook.com",
      "phone": "14998150263",
      "contactTitle": "Julia Otomo Duarte: Main Information"
    },
    {
      "id": "bfaee685-c48a-4462-9b3c-1dad6b7cff96",
      "email": "juju@mail.com",
      "phone": "",
      "contactTitle": "Contato 2"
    }
  ],
  "addedAt": "2023-07-27"
}
```

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

Resposta - status 409

```json
{
  "message": "Email already exists"
}
```

OU

```json
{
  "message": "Phone already exists"
}
```

<h2>Editar informação</h2>

`PATCH -> /users/:id/details/:contactTitle`

```json
{
  "email": "juju2@mail.com"
}
```

Resposta - status 200

```json
{
  "id": "5292e764-f173-4f4c-ab5f-b80421ceda8d",
  "name": "Julia Duarte",
  "image": "https://i0.statig.com.br/bancodeimagens/89/40/50/894050oomjqwfqtbhh4rditno.jpg",
  "details": [
    {
      "id": "a15480a4-d7db-406e-aebe-8d983e0ec7d5",
      "email": "julia_otomoduarte@outlook.com",
      "phone": "14998150263",
      "contactTitle": "Julia Otomo Duarte: Main Information"
    },
    {
      "id": "bfaee685-c48a-4462-9b3c-1dad6b7cff96",
      "email": "juju2@mail.com",
      "phone": "",
      "contactTitle": "Contato 2"
    }
  ],
  "addedAt": "2023-07-27"
}
```

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

Resposta - status 409

```json
{
  "message": "Email already exists"
}
```

OU

```json
{
  "message": "Phone already exists"
}
```

Resposta - status 404

```json
{
  "message": "User information not found"
}
```

<h2>Deletar informação</h2>

`DELETE -> /users/:id/details/:contactTitle`

Não há corpo de requisição e nem de resposta

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

Resposta - status 404

```json
{
  "message": "User information not found"
}
```

<h2>Cadastrar novo contato</h2>

`POST -> /contacts/:id`

Obs: o id presente no endpoint é referente ao id do usuário logado

```json
{
  "name": "Felipe",
  "image": "img",
  "email": "felipe@mail.com",
  "phone": "2222-2222"
}
```

Resposta - status 201

```json
{
  "name": "Felipe",
  "image": "img",
  "email": "felipe@mail.com",
  "phone": "2222-2222",
  "users": [
    {
      "id": "849bae57-f9e8-43e9-83ba-75fe1a8183f9",
      "name": "Ju Duarte",
      "password": "$2a$10$2LrgsEeOBrJkuvEG7VkRnu9VxwSXoPsRx9ZPmXR83umfPeRswXb3u",
      "image": "img",
      "addedAt": "2023-07-27",
      "contacts": []
    }
  ],
  "id": "a6d51004-4342-4efe-b376-7e13182728fb",
  "addedAt": "2023-07-27"
}
```

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

<h2>Listar todos os contatos de um usuário</h2>

`GET -> /contacts/:id`

Obs: o id presente no endpoint é referente ao id do usuário logado

Resposta - status 200

```json
[
  {
    "id": "bab912af-4cd4-4f54-8d14-ebf26a3fdbf6",
    "name": "Felipe Dias",
    "image": "https://www.canilgoldenpremier.com.br/wp-content/uploads/2015/09/comportamento-golden-retriever-1024x683.jpeg",
    "addedAt": "2023-07-30",
    "email": "felipe123@mail.com",
    "phone": "141111-1111"
  },
  {
    "id": "04b9b709-cc0d-4d45-9d72-f403d4db28b8",
    "name": "Katia",
    "image": "https://2.bp.blogspot.com/-AOIaLZt6meo/V-mW_Vy3utI/AAAAAAAABhI/v-Jxljw7NLw8g7XC5EgeOVcpdSh_JJffACLcB/s1600/Rosa.jpg",
    "addedAt": "2023-07-31",
    "email": "katia@mail.com",
    "phone": "14997266648"
  }
]
```

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

<h2>Buscar um contato em específico</h2>

`GET -> /contacts/:id/:email`

Obs: o id presente no endpoint é referente ao id do usuário logado

Resposta - status 200

```json
{
  "id": "bab912af-4cd4-4f54-8d14-ebf26a3fdbf6",
  "name": "Felipe Dias",
  "image": "https://www.canilgoldenpremier.com.br/wp-content/uploads/2015/09/comportamento-golden-retriever-1024x683.jpeg",
  "addedAt": "2023-07-30",
  "email": "felipe123@mail.com",
  "phone": "141111-1111"
}
```

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

Resposta - status 404

```json
{ "message": "Contact not found" }
```

<h2>Editar as informações de um contato</h2>

`PATCH -> /contacts/:id/:email`

Obs: o id presente no endpoint é referente ao id do usuário logado

```json
{
  "name": "Felipe de Almeida Dias"
}
```

Resposta - status 200

```json
{
  "id": "bab912af-4cd4-4f54-8d14-ebf26a3fdbf6",
  "name": "Felipe de Almeida Dias",
  "image": "https://www.canilgoldenpremier.com.br/wp-content/uploads/2015/09/comportamento-golden-retriever-1024x683.jpeg",
  "addedAt": "2023-07-30",
  "email": "felipe123@mail.com",
  "phone": "141111-1111"
}
```

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

Resposta - status 404

```json
{ "message": "Contact not found" }
```

Resposta - status 409

```json
{
  "message": "Email already exists"
}
```

OU

```json
{
  "message": "Phone already exists"
}
```

<h2>Deletar um contato</h2>

`DELETE -> /contacts/:id/:email`

Obs: o id presente no endpoint é referente ao id do usuário logado

Não há corpo de requisição e nem de resposta

Resposta - status 403

```json
{ "message": "Insufficient permission" }
```

Resposta - status 404

```json
{ "message": "Contact not found" }
```
