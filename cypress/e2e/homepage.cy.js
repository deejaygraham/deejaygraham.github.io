/// <reference types="cypress" />

describe("home page", () => {
  beforeEach(() => {
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

  it("search form is shown", () => {
    cy.get("form.navbar-item")
      .should("have.attr", "action")
      .and("equal", "https://deejaygraham.github.io/search/index.html");

    cy.get("#search-button").should("have.text", "Search");
  });

  it("contains list of posts", () => {
    cy.get("article").should("have.length", 36);

    cy.get(".post-summary")
      .first()
      .then(($p) => {
        cy.wrap($p).get("header > .tile-tags");
        cy.wrap($p).get("header > .tile-thumbnail");
        cy.wrap($p).get("header > .title");
      });
  });

  it("contains footer", () => {
    cy.get(".footer").scrollIntoView();

    cy.get(".footer .nav-item").should("have.length", 6);
  });
});
