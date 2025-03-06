
describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the app title', () => {
    cy.contains('h1', 'Tabula Rasa').should('be.visible');
  });

  it('should display the main features section', () => {
    cy.contains('h2', 'Key Features').should('be.visible');
    cy.contains('Academic Management').should('be.visible');
    cy.contains('Attendance Tracking').should('be.visible');
    cy.contains('Fee Management').should('be.visible');
  });

  it('should have working navigation buttons', () => {
    cy.contains('button', 'Vendor Login').should('be.visible').click();
    cy.url().should('include', '/vendor/login');
    
    cy.visit('/');
    cy.contains('button', 'Institution Login').should('be.visible').click();
    cy.url().should('include', '/institution/login');
    
    cy.visit('/');
    cy.contains('button', 'Parent/Guardian Login').should('be.visible').click();
    cy.url().should('include', '/guardian/login');
  });

  it('should display the CTA section', () => {
    cy.contains('Ready to transform your school management?').should('be.visible');
    cy.contains('Request Institution Callback').should('be.visible');
  });
});
