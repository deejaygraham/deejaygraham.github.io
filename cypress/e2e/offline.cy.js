/// <reference types="cypress" />

describe("offline page", () => {
  it("offline page exists", () => {
    cy.visit('/offline.html');
    cy.get("h1.title").should("have.text", "Erm...");
    cy.get("p").should("contain", "no internet connection at the moment");
  });
});
