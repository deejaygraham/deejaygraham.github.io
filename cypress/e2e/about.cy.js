/// <reference types="cypress" />

describe("about page", () => {
  beforeEach(() => {
    cy.visit("/about/");
  });

  it("contains correct title", () => {
    cy.title().should("contain", "Hey, Hi, Hello.");

    cy.get(".content").should(
      "contain",
      "My name is Derek Graham and this is my personal blog.",
    );
  });
});
