# Plano de Testes Manuais - Sistema de Autenticacao

Este documento cobre os principais cenarios de Login, Cadastro e Dashboard alinhados com a vaga de QA Junior.

## Login

| ID | Cenario | Pre-condicao | Passos | Resultado esperado |
| --- | --- | --- | --- | --- |
| L01 | Login com dados validos | Usuario cadastrado e pagina de login aberta | 1. Inserir e-mail e senha corretos. 2. Clicar em Entrar. | Usuario redirecionado para o dashboard e sessao criada. |
| L02 | Senha errada | Usuario cadastrado e pagina de login aberta | 1. Inserir e-mail valido e senha incorreta. 2. Clicar em Entrar. | Exibir mensagem de credenciais invalidas e permanecer na tela de login. |
| L03 | Email invalido | Pagina de login aberta | 1. Inserir e-mail fora do formato. 2. Clicar em Entrar. | Exibir validacao de campo de e-mail invalido. |
| L04 | Campos vazios | Pagina de login aberta | 1. Deixar e-mail e senha em branco. 2. Clicar em Entrar. | Impedir envio do formulario e destacar campos obrigatorios. |

## Cadastro

| ID | Cenario | Pre-condicao | Passos | Resultado esperado |
| --- | --- | --- | --- | --- |
| C01 | Cadastro valido | Pagina de cadastro aberta | 1. Preencher nome, e-mail e senha validos. 2. Clicar em Criar conta. | Conta criada, sessao autenticada e redirecionamento para o dashboard. |
| C02 | Email duplicado | E-mail ja cadastrado no sistema | 1. Tentar cadastrar com e-mail existente. 2. Clicar em Criar conta. | Exibir mensagem de e-mail ja utilizado. |
| C03 | Senha fraca | Pagina de cadastro aberta | 1. Informar senha simples. 2. Clicar em Criar conta. | Exibir alerta de validacao de senha fraca. |
| C04 | Campos vazios | Pagina de cadastro aberta | 1. Tentar cadastrar sem preencher os campos obrigatorios. 2. Clicar em Criar conta. | Impedir envio e sinalizar os campos obrigatorios. |

## Dashboard

| ID | Cenario | Pre-condicao | Passos | Resultado esperado |
| --- | --- | --- | --- | --- |
| D01 | Acesso sem login | Nenhuma sessao ativa | 1. Acessar /dashboard diretamente. | Redirecionar para /login. |
| D02 | Acesso com token valido | Usuario autenticado | 1. Realizar login. 2. Acessar o dashboard. | Carregar os dados do usuario corretamente. |
| D03 | Expiracao da sessao | Sessao autenticada e expirada | 1. Permanecer sem renovar a sessao. 2. Atualizar a pagina. | Invalidar a sessao e solicitar novo login. |