/// <reference types="cypress" />

describe("deployed site", () => {
  context("images", () => {
    it("contains favicon", () => {
      cy.request("/favicon.ico");
    });

    it("contains avatar images", () => {
      cy.request("/img/avatar.jpg");
      cy.request("/img/avatar.png");
      cy.request("/img/avatar.svg");
    });

    it("contains hero images", () => {
      cy.request("/img/heroes/hero-secret-harbour.jpg");
      cy.request("/img/heroes/makers-and-creators.jpg");
    });
  });

  context("javascript", () => {
    it("contains search scripts", () => {
      cy.request("/js/site.js");
      cy.request("/js/search.js");
      cy.request("/js/elasticlunr.min.js");
      cy.request("/sw.js");
    });
  });

  context("feeds", () => {
    it("contains xml feeds", () => {
      cy.request("/rss.xml");
      cy.request("/sitemap.xml");
    });
  });

  context("search", () => {
    it("contains json search db", () => {
      cy.request("/search-index.json");
    });
  });
  
  context("text files", () => {
    it("automation files", () => {
      cy.request("/robots.txt");
      cy.request("/humans.txt");
    });
  });
  
  context("stylesheets", () => {
    it("contains css", () => {
      cy.request("/css/site.css");
      cy.request("/css/prism.css");
    });
  });
});
