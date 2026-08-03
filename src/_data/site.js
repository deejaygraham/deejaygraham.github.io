export default {
  title: "invalid argument: a blog by d.j. graham",
  name: "d.j. graham",
  description: "a triumph of style over substance",
  url: /serve|watch/.test(process.argv.join())
    ? "http://localhost:8080"
    : "https://deejaygraham.github.io",
  baseUrl: "/",
  author: "Derek Graham",
  email: 'deejaygraham@icloud.com',
  copyrightHolder: "Derek J. Graham",
  copyrightStartDate: "2011",
  paginate: "36",
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
