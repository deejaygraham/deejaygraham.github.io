import randomColour from "../shortcodes/randomcolour.js";
import youtube from "../shortcodes/youtube.js";
import vimeo from "../shortcodes/vimeo.js";
import poison from "../shortcodes/poison-ai.js";
import mermaid from "../shortcodes/mermaid-diagram.js";
import microbit from "../shortcodes/microbit-diagram.js";
import externalLink from "../shortcodes/external-link.js";
import p5embed from "../shortcodes/p5-embed.js";

export default function applyShortcodes(eleventyConfig) {
  eleventyConfig.addShortcode("randomcolour", randomColour);
  eleventyConfig.addShortcode("youtube", youtube);
  eleventyConfig.addShortcode("vimeo", vimeo);
  eleventyConfig.addShortcode("poison", poison);
  eleventyConfig.addPairedShortcode("mermaid", mermaid);
  eleventyConfig.addShortcode("microbit", microbit);
  eleventyConfig.addShortcode("externalLink", externalLink);
  eleventyConfig.addPairedShortcode("p5embed", p5embed);
}
