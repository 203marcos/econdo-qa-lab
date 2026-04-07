describe('Fluxo de autenticacao', () => {
  it('faz login e acessa o dashboard', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('admin@econdo.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').contains('Fazer login').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Bem-vindo, Admin');
    cy.get('#auth-status').should('contain', 'Autenticado');
  });

  it('faz cadastro e redireciona para o dashboard', () => {
    cy.visit('/cadastro');

    cy.get('input[name="name"]').type('QA Novo');
    cy.get('input[name="email"]').type(`qa${Date.now()}@econdo.com`);
    cy.get('input[name="password"]').type('qa123456');
    cy.get('button[type="submit"]').contains('Criar conta').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Bem-vindo');
  });

  it('bloqueia acesso direto ao dashboard sem sessao', () => {
    cy.clearCookies();
    cy.visit('/dashboard');

    cy.url().should('include', '/login');
  });
});