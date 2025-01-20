/// <reference types="cypress" />

describe("404 page", () => {
  it("shows a 404 message when navigating to a non-existent page", () => {
    cy.request(  
      {
        url: '/blargleargle/', 
        failOnStatusCode: false
      }).its('status').should('equal', 404);
  });
  
  it("404 handler page exists", () => {
    cy.visit('/404');
    cy.get("h1.title").should("have.text", "Erm...");
    cy.get("p").should("contain", "The page you were looking for does not exist");
  });
});
