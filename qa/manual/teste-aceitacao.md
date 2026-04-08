# Teste de Aceitacao

Este documento valida se a aplicacao atende ao que a vaga e o produto esperam no fluxo principal.

## Objetivo

Confirmar que o usuario consegue se cadastrar, autenticar e acessar a area protegida com uma experiencia consistente.

## Cenarios

| ID | Cenario | Critério de aceite | Status esperado |
| --- | --- | --- | --- |
| A01 | Cadastro com sucesso | Usuario cria conta com dados validos | Redirecionar para dashboard e autenticar sessao |
| A02 | Login com sucesso | Usuario cadastrado acessa com credenciais validas | Redirecionar para dashboard |
| A03 | Acesso protegido | Usuario autenticado acessa /dashboard | Dashboard exibido com dados do usuario |
| A04 | Sessao encerrada | Usuario faz logout | Redirecionar para login e invalidar sessao |

## Como executar

1. Rodar a aplicacao.
2. Executar os fluxos manuais ou automatizados.
3. Conferir se os criterios de aceite foram cumpridos.

## Relacao com a vaga

Este teste ajuda a demonstrar visao de negocio, criterio de aceite e rastreabilidade entre requisito e entrega, algo importante tanto para QA quanto para Product Owner.
