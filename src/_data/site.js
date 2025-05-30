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
  paginate: "36",
  date: new Date(),
  // paths to images
  logo: "/img/avatar.svg",
  defaultThumbnail: "/img/thumbnails/notebook-420x255.webp",
  favicon: "./src/assets/img/favicon.png",
};
