# mfe-gerenciamento-pessoas

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular Version](https://img.shields.io/badge/Angular-v17-red?logo=angular)](https://angular.io/)
[![Teste Unitário](https://img.shields.io/badge/Testes-Jest-brightgreen?logo=jest)](https://jestjs.io/)

## 📝 Descrição do Projeto

Este projeto (`mfe-gerenciamento-pessoas`) é uma aplicação web front-end desenvolvida em **Angular v17**, focada no gerenciamento de dados de pessoas. Ele foi concebido com uma mentalidade de modularidade, preparando-o para futuras expansões em um contexto de **Micro Front-ends (MFE)**, embora atue como uma aplicação coesa neste momento.

O sistema demonstra a implementação de:
* **Formulários Reativos:** Implementação de formulários altamente controlados e validados para cadastro e edição de informações como nome, CPF, sexo, e-mail e telefone.
* **Consulta de Dados:** Funcionalidade de busca de pessoas por CPF, com exibição detalhada dos dados ou mensagem de "não encontrado".
* **Arquitetura Preparada para MFE:** Embora seja uma aplicação coesa, o nome e a estrutura interna são pensados para uma futura expansão em um contexto de Micro Front-ends, promovendo modularidade e escalabilidade.
* **Estilização e Responsividade:** Design moderno e adaptável a diferentes tamanhos de tela, garantindo uma ótima experiência de usuário em dispositivos desktop e móveis.
* **Testes Unitários:** Ampla cobertura de testes para garantir a robustez e a qualidade do código.
* **Mock de Serviço:** Utilização de um serviço de dados mockado para simular a integração com um backend.

Este projeto serve como uma demonstração prática de boas práticas de desenvolvimento Angular, incluindo manipulação de formulários, validações, requisições de dados (mockadas) e princípios de design moderno.

## ✨ Funcionalidades Principais

* Criação, Leitura e Edição de informações de Pessoas.
* Validação de campos (Nome, CPF, Sexo, E-mail, Telefone).
* Busca de Pessoas por CPF.
* Interface do usuário responsiva e intuitiva.

## 🚀 Tecnologias Utilizadas

* **Front-end:**
    * [Angular](https://angular.io/) (v17 ou superior)
    * [TypeScript](https://www.typescriptlang.org/)
    * **Framework CSS/Design System:** (Escolha um e adicione aqui, ex: [Angular Material](https://material.angular.io/), [Tailwind CSS](https://tailwindcss.com/), [Bootstrap](https://getbootstrap.com/), [PrimeNG](https://primeng.org/))
    * (Opcional, se você usou libs como `rxjs`, `ngrx`, etc., adicione aqui)
* **Mock de API:**
    * [Angular In-Memory Web API](https://angular.io/guide/http-client-in-memory-web-api) (Se você seguiu a sugestão)
* **Testes:**
    * [Jest](https://jestjs.io/) (Sugestão, mas indique qual você usou)
    * (Outras libs de teste, se aplicável, ex: [Cypress](https://www.cypress.io/) para E2E)
* **Ferramentas:**
    * [Node.js](https://nodejs.org/en/)
    * [Angular CLI](https://angular.io/cli)
    * [Git](https://git-scm.com/)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* [Node.js](https://nodejs.org/en/download/) (versão 20.x ou superior)
* [Angular CLI](https://angular.io/cli) (v17.x.x)
* [Git](https://git-scm.com/downloads)

## ⚙️ Configuração e Execução do Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/leonardoaf2/mfe-gerenciamento-pessoas.git](https://github.com/leonardoaf2/mfe-gerenciamento-pessoas.git)
    ```
2.  **Navegue até a pasta da aplicação:**
    ```bash
    cd mfe-gerenciamento-pessoas/app
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```
4.  **Execute a aplicação:**
    ```bash
    ng serve
    ```
    O servidor de desenvolvimento será iniciado e a aplicação estará disponível em `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## 🧪 Rodando os Testes

Para executar os testes unitários do projeto:

```bash
ng test