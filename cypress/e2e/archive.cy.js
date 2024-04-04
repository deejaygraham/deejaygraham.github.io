/// <reference types="cypress" />

describe('archive page', () => {

    beforeEach(() => {
        cy.visit('/archive/');
    });
 
    it('contains correct title', () => {
        cy.title()
        .should('contain', ' - blog archive');

        cy.get('h1')
        .should('have.text', 'Blog Entries by Month and Year');
    });

    it('contains entries for each month and year', () => {
        cy.get('.content')
        .should('contain', 'March 2024')
        .should('contain', 'Make A Jazz Noise Here')
        .should('contain', 'November 2018')
        .should('contain', 'Tracing Failed IIS Requests');
    });
});
  
