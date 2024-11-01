/// <reference types="cypress" />

describe("home page", () => {
  it("contain home icon", () => {
    cy.visit("/");
    cy.get(".navbar-brand > a").should("have.attr", "href").and("equal", "/");
  });

  it("navigation menu is shown", () => {
    cy.visit("/");
    cy.get(".navbar-end > a").should("have.length", 7);
    cy.get(".navbar-end > a").first().should("have.text", "home");
    cy.get(".navbar-end > a").last().should("have.text", "now");
  });

  it("contains list of posts", () => {
    cy.visit("/");
    cy.get(".cell").should("have.length", 12);
  });

  it("contains footer", () => {
    cy.visit("/");
    cy.get(".footer").scrollIntoView();
    cy.get(".level-item").should("have.length", 8);
  });
});
