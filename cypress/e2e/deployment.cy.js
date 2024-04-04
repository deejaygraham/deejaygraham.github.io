/// <reference types="cypress" />

describe('deployed site', () => {

    it('contains favicon', () => {
        cy.request('/favicon.ico');
    });

    it('contains avatar images', () => {
        cy.request('/img/avatar.jpg');
        cy.request('/img/avatar.png');
    });

    it ('contains hero images', () => {
        cy.request('/img/heroes/hero-secret-harbour.jpg');
        cy.request('/img/heroes/makers-and-creators.jpg');
    });
});
  
