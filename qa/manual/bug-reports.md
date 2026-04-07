(Mantido para registro de defeitos encontrados durante a validacao da aplicacao.)

# Registro de Bugs

| ID | Titulo | Severidade | Pre-condicao | Passos para reproducao | Resultado esperado | Resultado atual |
| --- | --- | --- | --- | --- | --- | --- |
| B01 | Dashboard permite acesso sem sessao | Alta | Nenhuma sessao ativa | 1. Abrir /dashboard em aba anonima. | Redirecionar para /login. | Acesso indevido caso o middleware falhe. |
| B02 | Email duplicado no cadastro | Media | E-mail ja cadastrado | 1. Preencher cadastro com email existente. 2. Enviar formulario. | Exibir mensagem de e-mail ja utilizado. | Mensagem deve ser mostrada pelo backend. |
| B03 | Mensagem de credencial invalida | Media | Usuario cadastrado | 1. Digitar senha incorreta no login. 2. Enviar formulario. | Exibir feedback claro de credenciais invalidas. | Validado no backend e no front. |
