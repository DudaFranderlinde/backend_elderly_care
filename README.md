# 🌟 Backend Elderly Care  🌟 

## Visão Geral 📈
A Plataforma de Apoio ao Envelhecimento é uma aplicação web desenvolvida para facilitar a interação entre cuidadores de idosos, seus clientes e familiares responsáveis. A plataforma visa oferecer uma comunicação eficaz e segura, proporcionando tranquilidade durante o processo de contratação de cuidadore


## Funcionalidades Principais 🎯

- **Cadastro de Cuidadores e Clientes(Responsável e Idosos):** Permitir que cuidadores e clientes se cadastrem na plataforma, com informações detalhadas sobre suas habilidades e necessidades.
  
- **Envio de Propostas:** Facilitar o envio de propostas de serviços por parte dos cuidadores.

- **Busca por Cuidadores:** Proporcionar um ambiente seguro para os familiares dos idosos e facilitando o processo de contratação.


## Arquitetura 🏛️

A aplicação é baseada em uma arquitetura cliente-servidor, dividida em duas partes principais:

- **Frontend:** Interface intuitiva e responsiva para que cuidadores, clientes e familiares possam interagir de maneira eficiente.
  
- **Backend:** Lógica de negócios, gerenciamento de usuários, bancos de dados e integrações com serviços externos para suportar as funcionalidades da plataforma.

## Tecnologias Utilizadas 💻

- **Frontend:** Framework de ReactJS para construção da interface do usuário, garantindo uma experiência fluida e amigável.

- **Backend:** Frame work de API Nest com TypeScript para desenvolvimento do servidor, aproveitando os benefícios de tipagem forte e organização estrutural.

- **Banco de Dados:** Utilização  de um banco de dados, como o PostgreSQL, para armazenar e gerenciar os dados dos usuários e suas interações na plataforma.

<div style="display: inline_block" align="center">
    <br>
    <img align="center" alt="Duda-PostgresSQL" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg">
    <img align="center" alt="Duda-JavaScript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg">
    <img align="center" alt="Duda-React" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg">
    <img align="center" alt="Duda-TypeScript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg">
    <img align="center" alt="Duda-TypeScript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" />    
    <hr align="center" style="border: none; height: 2px;">
</div>

## Configurações ⚙️

Para rodar o projeto é preciso criar o arquivo .env na raiz do projeto de backend, adicionar as informações sobre seu PostgreSQL, além da secret que servirá para gerar os tokens de autenticação.

```
# JWT
JWT_SECRET

# POSTGRESQL
DB_DIALECT=postgres
DB_HOST
DB_PORT
DB_USER
DB_PASS
DB_NAME=intelbras
```

## Rodando o Projeto 📝
Necessário ter o arquivo do frontend e backend instalado em sua máquina para rodar a aplicação de forma correta. A seguir temos um passo a passo de como executar o ambiente de desenvolvimento da plataforma:

### Frontend

1. Caso ainda seja a primeira vez, será necessário instalar as dependencias atráves do comando **npm**:

```
$ npm install
```

2. Para executar o aplicativo que ficará exposto em: http://localhost:5173

```
$ npm run start
```

### Backend


1. Caso ainda seja a primeira vez, será necessário instalar as dependencias atráves do comando **npm**:

```
$ npm install
```

2. É possível executar o aplicativo no modo de desenvolvimento utilizando o comando **:dev** no final. Que ficará exposto em: http://localhost:3000


```
$ npm run start
```

