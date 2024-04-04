/// <reference types="cypress" />

describe('deployed site', () => {

    context('images', () => {
        it('contains favicon', () => {
            cy.request('/favicon.ico');
        });
    
        it('contains avatar images', () => {
            cy.request('/img/avatar.jpg');
            cy.request('/img/avatar.png');
        });
    
        it('contains hero images', () => {
            cy.request('/img/heroes/hero-secret-harbour.jpg');
            cy.request('/img/heroes/makers-and-creators.jpg');
        });
    });

    context('javascript', () => {
        it('contains search scripts', () => {
            cy.request('/js/search.js');
            cy.request('/js/lunr.js');
        });
    });

    context('fonts', () => {
        it('contains fontawesome font', () => {
            cy.request('/webfonts/fa-regular-400.woff');
        });
    });

    context('feeds', () => {
        it('contains xml feeds', () => {
            cy.request('/rss.xml');
            cy.request('/atom.xml');
        });
    });

    context('stylesheets', () => {
        it('contains css', () => {
            cy.request('/css/site.css');
        });
    });
});
  
