/// <reference types="cypress" />

describe("code examples", () => {

    before(() => {
        cy.clearAllLocalStorage();
        cy.visit("/2024/11/01/microbit-sings-portal-theme/");
    });

    it("can be copied to clipboard", () => {
      cy.get('button:first').click().then(() => {
        cy.window().then((win) => { 
          win.navigator.clipboard.readText().then((text) => {
            expect(text).to.contain('phoneme = speech.translate(word)');
          });
        });
      });
    });
  });
  