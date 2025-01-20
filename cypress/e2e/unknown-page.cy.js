/// <reference types="cypress" />

describe("Try to load an unknown page", () => {
  it("shows a 404 page", () => {
    cy.visit({
      method: "GET",
      url: "/blargleargle/",
      failOnStatusCode: false,
    });
    cy.get("h1.title").should("have.text", "Erm...");
    cy.get("p").should("contain", "The page you were looking for does not exist");
  });
});
