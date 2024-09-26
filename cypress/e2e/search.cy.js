/// <reference types="cypress" />

describe("search for an existing item", () => {
  const searchTerm = "jazz";
  const expectedPostTitle = "Make A Jazz Noise Here";

  beforeEach(() => {
    cy.visit("/");
    cy.get("#search-box").type(searchTerm);
    cy.get("#search-button").click();
  });

  it("has a consistent page title", () => {
    cy.get("h1.title").should("contain", "search");
  });

  it("search results show matching articles", () => {
    cy.get("#search-results ul li")
      .should("have.length", 1)
      .first()
      .should("have.text", expectedPostTitle);
  });
});

describe("search for an not existing item", () => {
  const searchTerm = "blargleargle";

  before(() => {
    cy.visit("/");
    cy.get("#search-box").type(searchTerm);
    cy.get("#search-button").click();
  });

  it("search results not shown for nonsense term", () => {
    cy.get("#search-results").should(
      "have.text",
      "Nothing to see here.",
    );
  });
});
