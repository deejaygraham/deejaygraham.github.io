/// <reference types="cypress" />

describe('tags page', () => {

    beforeEach(() => {
        cy.visit('/tags/');
    });
 
    it('contains correct title', () => {
        cy.title()
        .should('contain', 'Blog Entries by Tag');

        cy.get('h1')
        .should('have.text', 'Blog Entries by Tag');
    });

    it('contains entries for each month and year', () => {
        cy.get('.content')
        .should('contain', '11ty')
        .should('contain', 'python')
        .should('contain', 'agile');
    });
});
  
