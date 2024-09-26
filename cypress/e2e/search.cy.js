/// <reference types="cypress" />

describe("search the site", () => {

  beforeEach(() => {
    cy.visit("/search/");
  });
  
  context("for a post by title", () => {
    it("has a consistent page title", () => {
      cy.get("h1.title").should("contain", "search");
    });
  
    it("search results show matching articles", () => {
      const searchTerm = "jazz";
      const expectedPostTitle = "Make A Jazz Noise Here";
      
      cy.get("#search-box").type(searchTerm);
      cy.get("#search-results li")
        .should("have.length", 1)
        .first()
        .should("have.text", expectedPostTitle);
    });
  });

  context("for a post by quotation author", () => {
    it("search results show matching articles", () => {
      const searchTerm = "Lehman";
      const expectedPostTitle = "Meir M Lehman";
      
      cy.get("#search-box").type(searchTerm);
      cy.get("#search-results li")
        .should("have.length", 1)
        .first()
        .should("have.text", expectedPostTitle);
    });
  });

  context("for a post by tag", () => {
    const searchTerm = "build";
    const expectedPostTitle = "Creating Builds in TFS 2015";
  
    it("search results show matching articles", () => {
      cy.get("#search-box").type(searchTerm);
      cy.get("#search-results li")
        .should("have.length", 1)
        .first()
        .should("have.text", expectedPostTitle);
    });
  });

  context("for an unknown term", () => {
  
    it("search results not shown for nonsense term", () => {
      const searchTerm = "blargleargle";
      
      cy.get("#search-box").type(searchTerm);
      cy.get("#search-results").should(
        "have.text",
        "Nothing to see here.",
      );
    });
  });
});
