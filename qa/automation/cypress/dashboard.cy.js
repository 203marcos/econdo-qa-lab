describe('Fluxo do dashboard', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('bloqueia acesso direto ao dashboard sem sessao', () => {
    cy.visit('/dashboard');

    cy.url().should('include', '/login');
  });

  it('faz logout e bloqueia acesso apos sair', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('admin@econdo.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').contains('Fazer login').click();

    cy.url().should('include', '/dashboard');
    cy.get('#logout-button').click();
    cy.url().should('include', '/login');

    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });
});