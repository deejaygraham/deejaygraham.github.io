/// <reference types="cypress" />

describe('projects page', () => {

    beforeEach(() => {
        cy.visit('/projects/');
    });
 
    it('contains correct title', () => {
        cy.title()
        .should('contain', ' - projects');

        cy.get('h1')
        .should('have.text', 'Things What I Have Made');
    });
});
