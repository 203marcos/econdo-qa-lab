# Sessao de Teste Exploratorio

## Objetivo

Explorar comportamentos nao cobertos diretamente pelos casos formais para encontrar defeitos nao obvios.

## Charter

- Area: login, cadastro e dashboard
- Duracao: ate 2 horas
- Foco: campos invalidos, mensagens, navegacao, responsividade, sessao e logout

## Perguntas durante a exploracao

- O usuario entende o erro exibido?
- O fluxo funciona em mobile?
- O dashboard abre sem sessao?
- O cookie da sessao e mantido corretamente?
- O sistema reage bem a dados incompletos ou estranhos?

## Evidencias esperadas

- Screenshot da falha ou comportamento inesperado
- Passos para reproducao
- Resultado esperado x resultado atual
- Severidade e impacto

## Como usar no projeto

1. Abrir o sistema no navegador.
2. Misturar entradas validas e invalidas.
3. Navegar entre login, cadastro e dashboard.
4. Registrar qualquer comportamento fora do esperado em `qa/manual/bug-reports.md`.
