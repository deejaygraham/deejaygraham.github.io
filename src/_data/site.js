export default {
  title: "invalid argument: a blog by d.j. graham",
  name: "d.j. graham",
  description: "a triumph of style over substance",
  url: /serve|watch/.test(process.argv.join())
    ? "http://localhost:8080"
    : "https://deejaygraham.github.io",
  baseUrl: "/",
  author: "Derek Graham",
  paginate: "36",
  buildTime: new Date(),
};
