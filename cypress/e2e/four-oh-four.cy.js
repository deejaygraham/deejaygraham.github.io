/// <reference types="cypress" />

describe("404 page", () => {

  it("shows 404 page for non existent topic", () => {
    cy.request(  
      {
        url: '/this-page-doesnot-exist/', 
        failOnStatusCode: false
      }).its('status').should('equal', 404);
  });
  
  it("404 handler page exists", () => {
    cy.visit('/404');
    cy.get(".content")
      .should("contain", "Erm...");
  });
});
