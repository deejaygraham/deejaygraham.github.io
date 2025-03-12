/// <reference types="cypress" />

describe("home page", () => {
  before(() => {
      cy.visit("/");
    });
  
  it("contain home icon", () => {
    cy.get(".navbar-brand > a").should("have.attr", "href").and("equal", "/");
  });

  it("navigation menu is shown", () => {
    cy.get(".navbar-end > a").should("have.length", 6);
    cy.get(".navbar-end > a").first().should("have.text", "home");
    cy.get(".navbar-end > a").last().should("have.text", "about");
  });

  it("contains most recent list of posts", () => {
    cy.get(".card").should("have.length", 12);
  });

  it("contains footer with social links", () => {
    cy.get(".footer").scrollIntoView();
    cy.get(".level-item").should("have.length", 7);
  });
});
