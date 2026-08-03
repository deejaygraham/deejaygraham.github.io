import site from "./site.js";

export default [
  {
    name: "rss",
    url: `${site.url}/rss.xml`,
    icon: "icons/rss.svg",
  },
  {
    name: "sitemap",
    url: `${site.url}/sitemap.xml`,
    icon: "icons/sitemap.svg",
  },
  {
    name: "github",
    url: site.urls.github,
    icon: "icons/github.svg",
  },
  {
    name: "mastodon",
    url: site.urls.mastodon,
    icon: "icons/mastodon.svg",
  },
  {
    name: "bluesky",
    url: site.urls.bluesky,
    icon: "icons/bluesky.svg",
  },
  {
    name: "linkedin",
    url: site.urls.linkedin,
    icon: "icons/linkedin.svg",
  },
  {
    name: "slideshare",
    url: site.urls.slideshare,
    icon: "icons/slideshare.svg",
  },
  {
    name: "sessionize",
    url: site.urls.sessionize,
    icon: "icons/sessionize.svg",
  },
];
