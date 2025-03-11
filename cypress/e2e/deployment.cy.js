/// <reference types="cypress" />

describe("deployed site", () => {
  context("images", () => {

    // website favicon and variants generated by a plugin
    it("contains favicon and variants", () => {
      cy.request("/favicon.ico");
      cy.request("/apple-touch-icon.png");
      cy.request("/icon-192.png");
      cy.request("/icon-512.png");
      cy.request("/manifest.webmanifest");
    });

    // avatar logo from top left corner
    it("contains avatar images", () => {
      cy.request("/img/avatar.svg");
      cy.request("/img/favicon.png");
      cy.request("/img/favicon.svg");
    });

    it("contains hero images", () => {
      cy.request("/img/heroes/hero-secret-harbour.jpg");
      cy.request("/img/heroes/makers-and-creators.jpg");
    });

    it("contains og social images for blog posts", () => {
      cy.request("/img/previews/singing-the-portal-theme.png");
      cy.request("/img/previews/microbit-bird-song2.png");
    });

    it("contains svg icons", () => {
      cy.request("/img/avatar.svg");
      cy.request("/img/bluesky.svg");
      cy.request("/img/favicon.svg");
      cy.request("/img/github.svg");
      cy.request("/img/linkedin.svg");
      cy.request("/img/mastodon.svg");
      cy.request("/img/rss.svg");
      cy.request("/img/sessionize.svg");
      cy.request("/img/slideshare.svg");
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
      cy.request("/feed.json");
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
