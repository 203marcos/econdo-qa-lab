# eCondo QA Lab

Projeto de laboratório de QA para uma aplicação web simples de login, cadastro e dashboard protegido.

O foco do repositório é mostrar um fluxo completo de validação: testes manuais, automação E2E, testes de API, cobertura unitária, performance e verificação básica de segurança.

## Visão geral

A aplicação foi construída com Node.js e Express no backend e HTML, CSS e JavaScript puro no frontend. A autenticação usa JWT armazenado em cookie `httpOnly`, o que evita expor o token ao JavaScript do navegador.

## Stack

* Backend: Node.js, Express, bcryptjs e jsonwebtoken
* Frontend: HTML, CSS e JavaScript
* E2E: Cypress
* Unit e API: Vitest
* Contrato/API via collection: Postman + Newman
* Performance: k6
* Segurança baseline: OWASP ZAP

## Estrutura principal

```text
public/
  assets/
    css/
      app.css
    js/
      auth.js
      dashboard.js
  pages/
    cadastro.html
    dashboard.html
    login.html
src/
  server.js
  utils/
    authValidation.js
qa/
  api/
    postman-collection.json
  automation/
    api/
      auth.api.test.js
    cypress/
      cadastro.cy.js
      dashboard.cy.js
      login.cy.js
    unit/
      authValidation.test.js
  manual/
    bug-reports.md
    casos-de-teste.md
    checklist-nao-funcional.md
    teste-aceitacao.md
    teste-exploratorio.md
  performance/
    k6-smoke.js
  reports/
  security/
    zap-baseline.md
```

## Cobertura de testes

* Cypress cobre os fluxos de usuário: login, cadastro, dashboard e logout.
* Vitest cobre validações unitárias e testes de API com Supertest.
* Newman executa a collection do Postman via linha de comando e gera relatório.
* k6 faz smoke test de performance.
* OWASP ZAP Baseline faz uma verificação passiva de segurança.

## Por que essas ferramentas

* Vitest foi escolhido para unit e API porque reduz configuração, roda rápido e já encaixa bem com o ecossistema do projeto.
* Newman entra para automatizar a collection do Postman sem depender da interface gráfica.
* Cypress fica dedicado ao fluxo fim a fim, onde o valor está em validar a experiência real do usuário.
* Supertest é usado nos testes de API porque facilita chamar a aplicação diretamente e validar respostas com precisão.

## Como executar

```bash
npm install
npm start
```

Depois acesse `http://localhost:3000`.

Para os testes:

```bash
npm run cy:run
npm run test:unit
npm run test:api
npm test
npm run test:postman
npm run test:postman:html
npm run test:perf
npm run test:security
```

## Documentação de QA

Os registros manuais e artefatos de QA ficam na pasta `qa/` e incluem casos de teste, bugs, checklist não funcional, teste exploratório, testes de API, performance e segurança.

## CI

O repositório também possui automação de pipeline em `.github/workflows/qa-ci.yml` e template de PR em `.github/pull_request_template.md`.

## Observação

Este repositório foi montado como portfólio técnico para demonstrar práticas de QA aplicadas a um sistema simples, sem depender de textos de apresentação ou de entrevista no README.
