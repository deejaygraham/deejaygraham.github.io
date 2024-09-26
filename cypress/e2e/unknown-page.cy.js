/// <reference types="cypress" />

describe("Try to load an unknown page", () => {
  const searchTerm = "jazz";
  const expectedPostTitle = "Make A Jazz Noise Here";

  it("shows a 404 page", () => {
    cy.visit("/blargleargle/");
    cy.get("h1.title").should("have.text", "Content not found");
    cy.get("p").should("have.text", "Try going to the home page");
  });
});
