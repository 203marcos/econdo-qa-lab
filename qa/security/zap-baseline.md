# OWASP ZAP Baseline

Objetivo: executar uma varredura passiva rapida para identificar alertas de seguranca iniciais.

## Pre-requisitos

- Docker instalado
- Aplicacao rodando em http://localhost:3000

## Execucao padrao (WSL/Linux)

```bash
npm run test:security
```

Se o container nao conseguir acessar o host, use a variavel de ambiente abaixo ou confirme que o Docker esta com suporte a `host-gateway`:

```bash
ZAP_TARGET=http://host.docker.internal:3000 npm run test:security
```

## Execucao com target customizado

```bash
ZAP_TARGET=http://host.docker.internal:3000 npm run test:security
```

Se estiver em WSL e o acesso falhar, primeiro confirme que a app esta rodando em `http://localhost:3000` e que o Docker Desktop esta com integração WSL ativa.

## Saida de relatorios

- qa/reports/zap-report.json
- qa/reports/zap-report.html

## Como interpretar

1. Priorizar alertas Medium/High no relatorio.
2. Registrar cada achado em qa/manual/bug-reports.md.
3. Reexecutar depois da correcao para validar regressao.
