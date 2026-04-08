# Checklist de Testes Nao Funcionais

Este checklist ajuda a demonstrar maturidade QA para alem dos testes funcionais.

## Performance

| ID | Verificacao | Resultado esperado |
| --- | --- | --- |
| NF-P01 | Tempo medio de resposta em login/cadastro | Resposta abaixo de 500 ms em ambiente local |
| NF-P02 | Carregamento inicial da pagina de login | Renderizacao visual em ate 2 segundos |
| NF-P03 | Estabilidade em acessos sequenciais | Sem erro 5xx em sequencia de 50 requisicoes |

## Seguranca

| ID | Verificacao | Resultado esperado |
| --- | --- | --- |
| NF-S01 | Cookie de sessao | Cookie com HttpOnly e SameSite=Lax |
| NF-S02 | Acesso ao dashboard sem sessao | Redirecionamento para login |
| NF-S03 | Entrada invalida em login/cadastro | API nao quebra e retorna erro controlado |

## Usabilidade

| ID | Verificacao | Resultado esperado |
| --- | --- | --- |
| NF-U01 | Responsividade em mobile | Layout sem quebra em 360x640 |
| NF-U02 | Feedback para erro de login | Mensagem clara e visivel ao usuario |
| NF-U03 | Fluxo pos-cadastro | Usuario redirecionado corretamente para dashboard |

## Observabilidade Basica

| ID | Verificacao | Resultado esperado |
| --- | --- | --- |
| NF-O01 | Endpoint de health | Retorno consistente em /health |
| NF-O02 | Erros de rota inexistente | Retorno 404 com payload padronizado |