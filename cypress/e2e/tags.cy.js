/// <reference types="cypress" />

describe("tags page", () => {
  beforeEach(() => {
    cy.visit("/tags/");
  });

  it("contains entries for each tagged topic", () => {
    cy.get(".content")
      .should("contain", "#11ty")
      .should("contain", "#python")
      .should("contain", "#agile");
  });
});
