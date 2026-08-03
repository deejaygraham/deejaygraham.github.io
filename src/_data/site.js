const isLocalDev = ["serve", "watch"].includes(process.env.ELEVENTY_RUN_MODE);

export default {
  title: "invalid argument: a blog by d.j. graham",
  name: "d.j. graham",
  description: "a triumph of style over substance",
  url: isLocalDev
    ? "http://localhost:8080"
    : "https://deejaygraham.github.io",
  author: "Derek Graham",
  email: 'deejaygraham@icloud.com',
  copyrightHolder: "Derek J. Graham",
  copyrightStartDate: "2011",
  paginate: 36,
  rssItemCount: 48,
  relatedPostCount: 6,
  date: new Date(),
  // paths to images
  logo: "/img/avatar.svg",
  favicon: "./src/assets/img/favicon.png",
  urls: {
    github: "https://github.com/deejaygraham",
    bluesky: "https://bsky.app/profile/deejaygraham.bsky.social",
    mastodon: "https://hachyderm.io/@deejaygraham",
    linkedin: "https://www.linkedin.com/in/derekjohngraham/",
    slideshare: "https://www.slideshare.net/deejaygraham",
    sessionize: "https://sessionize.com/deejaygraham/",
    openprocessing: "https://openprocessing.org/user/458593/",
  }
};
