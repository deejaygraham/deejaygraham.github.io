/// <reference types="cypress" />

describe("Externally linked Resources", () => {
  context("Sketchnote challenge", () => {
    beforeEach(() => {
      cy.visit("/2015/02/15/sketchnote-challenge/");
    });

    it("Contains correct title", () => {
      cy.title().should("contain", "Sketchnoting Challenge");
    });

    it("Contains sketchnote image", () => {
      const div = cy.get(".sketchnote");
      div.scrollIntoView();
      div.should("be.visible");
      div.within(() => {
        const img = cy.get("img");
        img.should(
          "have.attr",
          "src",
          "/img/posts/sketchnoting-challenge/mac-power-users.webp",
        );
      });
    });

    it("Contains external image link", () => {
      cy.request("/img/posts/sketchnoting-challenge/mac-power-users-hifi.png");
    });
  });

  context("Sketchnoting at DDD North", () => {
    before(() => {
      cy.visit("/2015/10/26/sketchnoting-at-dddnorth-2015/");
    });

    it("Contains correct title", () => {
      cy.title().should("contain", "Sketchnoting at DDDNorth 2015");
    });

    it("Contains external image link", () => {
      cy.request("/img/posts/sketchnoting-at-dddnorth-2015/luke-stringer.jpg");
    });
  });

  context("Sketchnoting for Developers talk", () => {
    before(() => {
      cy.visit("/sketchnoting-for-developers");
    });

    it("Contains correct title", () => {
      cy.title().should("contain", "sketchnoting for developers");
    });
  });

  context("ACE conference", () => {
    it("Contains correct title", () => {
      cy.request(
        "https://deejaygraham.github.io/img/posts/sketchnotes-from-ace-2014/gilb.png",
      );
    });
  });
});
