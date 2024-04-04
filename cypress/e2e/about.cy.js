/// <reference types="cypress" />

describe('about page', () => {

    beforeEach(() => {
        cy.visit('/about/');
    });
 
    it('contains correct title', () => {
        cy.title()
        .should('contain', 'about d.j.graham');

        cy.get('h1')
        .should('have.text', 'Hey, Hi, Hello.');
    });
});
  
