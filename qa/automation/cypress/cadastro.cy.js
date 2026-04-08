describe('Fluxo de cadastro', () => {
  beforeEach(() => {
    cy.clearCookies();
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

  it('bloqueia cadastro com email duplicado', () => {
    const email = `qa.duplicado.${Date.now()}@econdo.com`;

    cy.visit('/cadastro');
    cy.get('input[name="name"]').type('QA Duplicado 1');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('qa123456');
    cy.get('button[type="submit"]').contains('Criar conta').click();
    cy.url().should('include', '/dashboard');

    cy.clearCookies();
    cy.visit('/cadastro');
    cy.get('input[name="name"]').type('QA Duplicado 2');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('qa123456');
    cy.get('button[type="submit"]').contains('Criar conta').click();

    cy.get('#auth-feedback').should('contain', 'email already registered');
  });
});