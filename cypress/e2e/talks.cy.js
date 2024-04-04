/// <reference types="cypress" />

describe('talks page', () => {
    beforeEach(() => {
        cy.visit('/talks/');
    });
 
    it('contains correct title', () => {
        cy.title()
        .should('contain', 'talks');
    });

    it('contains talk tiles', () => {
        cy.get('.content')
        .should('contain', 'Married to the Mob')
        .should('contain', 'no SOLID evidence')
        .should('contain', 'The Elements of Style')
        .should('contain', 'Sketchnoting for Developers');
    });
});
  
