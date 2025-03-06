
describe('Authentication Pages', () => {
  context('Vendor Login', () => {
    beforeEach(() => {
      cy.visit('/vendor/login');
    });

    it('should display the login form', () => {
      cy.contains('h2', 'Vendor Login').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should have working forgot password link', () => {
      cy.contains('Forgot Password?').click();
      cy.url().should('include', '/vendor/forgot-password');
    });

    it('should show validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });
  });

  context('Institution Login', () => {
    beforeEach(() => {
      cy.visit('/institution/login');
    });

    it('should display the login form', () => {
      cy.contains('Institution Login').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should have working forgot password link', () => {
      cy.contains('Forgot Password?').click();
      cy.url().should('include', '/institution/forgot-password');
    });
  });

  context('Guardian Login', () => {
    beforeEach(() => {
      cy.visit('/guardian/login');
    });

    it('should display the login form', () => {
      cy.contains('Guardian Login').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should have working forgot password link', () => {
      cy.contains('Forgot Password?').click();
      cy.url().should('include', '/guardian/forgot-password');
    });
  });

  context('Forgot Password', () => {
    beforeEach(() => {
      cy.visit('/vendor/forgot-password');
    });

    it('should display the forgot password form', () => {
      cy.contains('Forgot Password').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should redirect back to login page from forgot password', () => {
      cy.contains('Back to Login').click();
      cy.url().should('include', '/vendor/login');
    });
  });
});
