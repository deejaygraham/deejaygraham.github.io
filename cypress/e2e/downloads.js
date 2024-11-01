/// <reference types="cypress" />

describe("downloads for site", () => {
  it("contains pdf samples", () => {
    cy.request("/downloads/Dotted-a4-portrait.pdf");
    cy.request("/downloads/Dotted-a4-landscape.pdf");
    cy.request("/downloads/Graph-a4-portrait.pdf");
    cy.request("/downloads/Graph-a4-landscape.pdf");      
    cy.request("/downloads/Manuscript-a4-portrait.pdf");
    cy.request("/downloads/Manuscript-a4-landscape.pdf");
  });

  it("contains zipped code", () => {
    cy.request("/downloads/rfk_scratch_binary.zip");
    cy.request("/downloads/MsBuild.ThreeByTwo.Tasks.zip");
  });
});
