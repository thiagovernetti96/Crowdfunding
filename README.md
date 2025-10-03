# Crowdfunding
Plataforma de Financiamento Coletivo (Crowdfunding)
-----

## Resumo do Projeto
O projeto **Crowdfunding** tem como objetivo desenvolver uma plataforma digital de financiamento coletivo, permitindo que usuários criem campanhas, recebam contribuições financeiras e acompanhem o progresso até atingir as metas estabelecidas.  

O problema enfrentado é a falta de sistemas acessíveis e simples para gerenciar campanhas de arrecadação, dificultando a organização, transparência e confiança dos apoiadores.  

A solução proposta é uma aplicação web estruturada em camadas (API + frontend) que possibilita a gestão de campanhas de forma segura, escalável e prática.  

Como consequência, o sistema busca promover maior acessibilidade e confiança em projetos de arrecadação, podendo ser aplicado em ONGs, startups e projetos pessoais.

---

## Definição do Problema
Atualmente, muitas iniciativas de arrecadação sofrem com problemas de transparência, usabilidade e centralização em grandes plataformas. Isso limita o acesso de pequenos projetos e reduz a confiança de potenciais apoiadores.  

Este projeto busca propor uma alternativa de software que seja clara, simples e com autenticação segura para proteger tanto os criadores de campanhas quanto os doadores.  

Projetos correlatos, como Kickstarter e Catarse, apresentam modelos semelhantes, mas exigem taxas altas ou não oferecem a flexibilidade desejada. O **Crowdfunding** se diferencia por ser open source, permitir customização e ser escalável.

---

## Objetivos

### 🎯 Objetivo Geral
Desenvolver uma aplicação web de financiamento coletivo que permita criar, gerenciar e apoiar campanhas de arrecadação de forma simples e segura.

### 🔹 Objetivos Específicos
- Permitir o cadastro e autenticação de usuários.  
- Implementar CRUD de campanhas de financiamento.  
- Possibilitar contribuições financeiras com regras de validação.  
- Implementar autenticação via JWT para rotas protegidas.  
- Fornecer transparência através de status de metas alcançadas.
- Integração com api de pagamento via pix para efetuar o pagamento

---

## Stack Tecnológico
- **Node.js** – Ambiente de execução backend.  
- **TypeScript** – Tipagem estática e segurança no desenvolvimento.  
- **Express** – Framework web para criação da API.  
- **TypeORM** – ORM para gerenciamento do banco de dados relacional.  
- **JWT** – Autenticação e segurança de endpoints.  
- **Banco de Dados Relacional (PostgreSQL) – Armazenamento dos dados.  

---

## Descrição da Solução
A solução consiste em uma **API REST** desenvolvida em Node.js com TypeScript e TypeORM, responsável por toda a lógica de autenticação, cadastro de usuários e gerenciamento de campanhas.  

Usuários podem:
- Criar contas e autenticar via JWT.  
- Criar novas campanhas, definindo título, descrição, valor alvo e prazo.  
- Apoiar campanhas ativas realizando contribuições financeiras.  
- Consultar status de arrecadação em tempo real.  

O sistema garante segurança através da validação de autenticação em rotas protegidas, impedindo operações críticas sem login válido.

---

## Arquitetura
A aplicação está organizada em camadas de **Controller**, **Service** e **Repository**, aplicando boas práticas de separação de responsabilidades.  

#Sequência do Projeto:
 O projeto ira continuar com a parte de frontend que irá consumir essa api utilizando react e bootstrap
