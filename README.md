# QA Lab - Simulacao de Testes de Software

## Contexto

Este projeto foi desenvolvido como um laboratorio pratico para simular a atuacao de um QA Junior, aplicando na pratica os principais conceitos e ferramentas exigidos em processos seletivos da area de Quality Assurance.

O sistema utilizado e uma aplicacao simples de login e autenticacao, implementada em Node.js para manter a base mais leve e rapida de executar.

A estrutura agora inclui uma interface com tres paginas, login, cadastro e dashboard protegido, alem de um back end com JWT para testes manuais e de API.

## Objetivo

Aplicar na pratica os seguintes pontos:

* Testes manuais, funcionais e nao funcionais
* Testes de regressao
* Criacao e execucao de casos de teste
* Registro e documentacao de bugs
* Testes de API
* Introducao a automacao de testes
* Simulacao de uso de ferramentas do mercado como Jira, Postman e Cypress

## Estrutura da aplicacao

* Front end em HTML, CSS e JavaScript puro
* Back end em Node.js com Express
* Autenticacao com JWT para login, cadastro e area protegida
* Sessao via cookie HTTP-only, sem armazenar token em localStorage
* Endpoints de apoio para health, usuarios, login, cadastro e perfil autenticado

### Organizacao de pastas

```text
public/
  assets/
    css/
      app.css
    js/
      auth.js
      dashboard.js
  pages/
    login.html
    cadastro.html
    dashboard.html
src/
  server.js
```

### Estrategia de token e sessao

* O JWT e criado no backend apos login/cadastro.
* O token e salvo no cookie `session_token` com `httpOnly`, `sameSite=lax` e expiracao de 2 horas.
* O navegador nao expõe esse token ao JavaScript da pagina.
* Essa abordagem e mais segura que localStorage para reduzir risco em caso de XSS.

## Estrutura de QA

```text
qa/
  manual/
    casos-de-teste.md
    bug-reports.md
  api/
    postman-collection.json
  automation/
    cypress/
      login.cy.js
```

## Tecnologias e Ferramentas utilizadas

### Gestao e organizacao

* Jira simulado
  Utilizado como referencia para estrutura de criacao e acompanhamento de bugs e tarefas, seguindo fluxo agil.

* TestRail e Zephyr conceituais
  Aplicado o conceito de organizacao e execucao de casos de teste.

### Testes de API

* Postman
  Utilizado para validar endpoints, status codes e estrutura das respostas.

### Automacao de testes

* Cypress
  Utilizado para automacao de testes end to end simulando o comportamento do usuario.

### Ambiente de testes

* Aplicacao Web de Login
* Navegador e DevTools para inspecao e analise de comportamento

## Tipos de testes aplicados

### Testes funcionais

Validacao do comportamento esperado do sistema com diferentes entradas de dados.

### Testes nao funcionais

Analise basica de comportamento da aplicacao, como usabilidade e respostas do sistema.

### Testes de regressao

Reexecucao de cenarios apos alteracoes simuladas para garantir que funcionalidades nao foram impactadas.

## Casos de teste

Foram criados e executados cenarios baseados em requisitos da funcionalidade de login, como:

* Login com credenciais validas
* Login com senha incorreta
* Campos obrigatorios nao preenchidos
* Validacao de formatos invalidos

Todos os cenarios estao documentados em:

```text
qa/manual/casos-de-teste.md
```

## Registro de bugs

Os bugs foram documentados seguindo boas praticas utilizadas em ferramentas como Jira, contendo:

* Titulo claro
* Passos para reproducao
* Resultado esperado
* Resultado atual

Arquivo:

```text
qa/manual/bug-reports.md
```

## Testes de API com Postman

Foram realizados testes em endpoints simulados como:

* GET /health
* GET /api/users
* POST /api/login
* POST /api/register
* GET /api/me

Validacoes realizadas:

* Status code como 200 e 400
* Estrutura da resposta em JSON
* Consistencia dos dados

Collection disponivel em:

```text
qa/api/postman-collection.json
```

## Telas da aplicacao

* `/login` para autenticacao
* `/cadastro` para criacao de conta
* `/dashboard` para area protegida apos login

## Automacao com Cypress

Foi implementado um teste automatizado cobrindo o fluxo de login:

* Acesso a aplicacao
* Preenchimento de credenciais
* Interacao com elementos
* Validacao do comportamento esperado

Arquivo:

```text
qa/automation/cypress/login.cy.js
```

## Como executar

```bash
npm install
npm start
```

Depois abra `http://localhost:3000` no navegador.

## Integracao com metodologia agil

O projeto foi estruturado simulando um ambiente com praticas ageis:

* Organizacao de tarefas em fluxo Kanban
* Execucao continua de testes durante o desenvolvimento
* Foco em entregas incrementais com Scrum

## Habilidades desenvolvidas

* Pensamento analitico e critico
* Atencao a detalhes
* Comunicacao na documentacao de bugs
* Criacao estruturada de testes
* Entendimento do ciclo de qualidade de software

## Conclusao

Este projeto demonstra, na pratica, a aplicacao dos principais conceitos e ferramentas exigidos para uma posicao de QA Junior, evidenciando capacidade de aprendizado, organizacao e foco em qualidade de software.

## Observacao

Projeto desenvolvido com fins educacionais e para pratica de Quality Assurance, com base na descricao da vaga em `vagaDescricao/vaga.txt`.
