/**
 * Topic hubs: curated landing pages for selected tags at /tags/{slug}/.
 * Keys must match normalized tag names (see src/content/posts/tag-taxonomy.js).
 *
 * Fields:
 * - title, description — page title and meta description
 * - intro — short HTML (paragraphs) shown above the post list
 * - featured — optional { url, blurb }[] (site-root paths like /2025/06/02/slug/)
 * - relatedTags — optional string[] of other tag names for cross-links
 */
export default {
  microbit: {
    title: "micro:bit",
    description:
      "BBC micro:bit projects on this blog — MicroPython, sound, LEDs, and small playful programs.",
    intro: `<p>
      Notes and experiments with the BBC micro:bit - short Python sketches, music and noise,
      displays, and occasional silliness. Everything here assumes you are happy flashing .hex
      files or editing in the web editor or Mu.
    </p>`,
    featured: [
      {
        url: "/2026/03/12/micro-mesh/",
        blurb: "Mesh network implemented using several microbits.",
      },
      {
        url: "/2025/05/29/microbit-musicbox/",
        blurb: "Turning the micro:bit into a tiny music box.",
      },
    ],
    relatedTags: ["python", "music", "code"],
  },
};
