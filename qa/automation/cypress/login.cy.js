describe('Fluxo de autenticacao', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('faz login e acessa o dashboard', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('admin@econdo.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').contains('Fazer login').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Bem-vindo, Admin');
    cy.get('#auth-status').should('contain', 'Autenticado');
  });

  it('exibe erro para login com senha incorreta', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('admin@econdo.com');
    cy.get('input[name="password"]').type('senha-errada');
    cy.get('button[type="submit"]').contains('Fazer login').click();

    cy.url().should('include', '/login');
    cy.get('#auth-feedback').should('contain', 'invalid credentials');
  });

  it('exibe erro para email em formato invalido no login', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('email-invalido');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').contains('Fazer login').click();

    cy.get('#auth-feedback').should('contain', 'invalid email format');
  });
});