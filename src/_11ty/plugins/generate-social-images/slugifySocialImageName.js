/**
 * Stable filename slug for OG preview images.
 * Must stay in sync with template usage: {{ page.fileSlug | socialImageFile }}
 */
export default function slugifySocialImageName(value) {
  return `${value ?? ""}`.replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
}
