# Desafio Front-End: Gerenciamento de Pessoas com Angular

Aplicação web desenvolvida como parte de um desafio técnico para front-end, utilizando Angular 17. O sistema permite o cadastro e a consulta de pessoas, com formulários reativos, validações e uma interface moderna e responsiva construída com Angular Material.

---

## Funcionalidades Implementadas

-   **Cadastro de Pessoas:** Formulário reativo com validações em tempo real para nome, CPF, sexo, e-mail e telefone.
-   **Consulta de Pessoas:** Busca de usuários por CPF com feedback visual para carregamento, sucesso e erro.
-   **Interface Responsiva:** As telas se adaptam a diferentes tamanhos de dispositivo, de desktops a celulares.
-   **Notificações Customizadas:** Sistema de feedback ao usuário com snackbars personalizados para operações bem-sucedidas e para erros.
-   **Simulação de Backend:** Utiliza a biblioteca `Angular In-Memory Web API` para simular um servidor RESTful, permitindo que a aplicação funcione de forma autônoma.
-   **Arquitetura Orientada a Serviços:** A lógica de negócio é centralizada em serviços, desacoplando a interface da manipulação de dados.

---

## Tecnologias Utilizadas

-   **Framework Principal:** Angular 17
-   **Linguagem:** TypeScript
-   **Estilização:** Angular Material & SCSS
-   **Programação Reativa:** RxJS
-   **Testes:** Jest
-   **Máscaras de Input:** ngx-mask
-   **Mock de API:** Angular In-Memory Web API

---

## Configuração e Execução do Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
-   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior recomendada)
-   [Angular CLI](https://angular.dev/cli) (ex: `npm install -g @angular/cli`)
-   [Git](https://git-scm.com/)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/leonardoaf2/mfe-gerenciamento-pessoas.git](https://github.com/leonardoaf2/mfe-gerenciamento-pessoas.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd mfe-gerenciamento-pessoas
    ```

3.  **Instale as dependências (neste local):**
    ```bash
    npm install
    ```

4.  **Execute a aplicação (neste local):**
    ```bash
    npm start
    ```

A aplicação estará disponível no seu navegador em `http://localhost:4200/`.

---

## Rodando os Testes Unitários

O projeto está configurado com Jest para testes unitários e possui 100% de cobertura de testes para a camada de serviços.

1.  **Para rodar os testes uma vez:**
    ```bash
    npm test
    ```

2.  **Para rodar os testes e gerar o relatório de cobertura:**
    ```bash
    npm run test:coverage
    ```
    Após a execução, uma pasta `coverage/` será criada na raiz do projeto. Abra o arquivo `index.html` dentro dela para ver o relatório detalhado no seu navegador.

---
Feito por Leonardo.