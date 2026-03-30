import { TAG_REGISTRY, tagsBySlug } from "../data/taxonomy";

// ---------------------------------------------------------------------------
// normalizeTag
// ---------------------------------------------------------------------------

/**
 * Convert any tag string to a canonical slug: lowercase and hyphenated.
 *
 * @example
 * normalizeTag("Context Engineering") // "context-engineering"
 * normalizeTag("OpenShift")           // "openshift"
 */
export function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// getTagLabel
// ---------------------------------------------------------------------------

/**
 * Look up the display label for a tag slug from the registry.
 * Falls back to a title-cased version of the slug if not found.
 *
 * @example
 * getTagLabel("context-engineering") // "Context Engineering"
 * getTagLabel("unknown-tag")         // "Unknown Tag"
 */
export function getTagLabel(slug: string): string {
  const entry = tagsBySlug[slug];
  if (entry) return entry.label;

  // Graceful fallback: title-case each hyphenated segment
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ---------------------------------------------------------------------------
// validateTags
// ---------------------------------------------------------------------------

export interface TagValidationResult {
  valid: string[];
  unknown: string[];
}

/**
 * Check a list of tag strings (raw or slugified) against the registry.
 * Returns two lists: tags that matched and tags that did not.
 *
 * @example
 * validateTags(["context-engineering", "made-up-tag"])
 * // { valid: ["context-engineering"], unknown: ["made-up-tag"] }
 */
export function validateTags(tags: string[]): TagValidationResult {
  const registeredSlugs = new Set(TAG_REGISTRY.map((t) => t.slug));
  const valid: string[] = [];
  const unknown: string[] = [];

  for (const tag of tags) {
    const slug = normalizeTag(tag);
    if (registeredSlugs.has(slug)) {
      valid.push(slug);
    } else {
      unknown.push(slug);
    }
  }

  return { valid, unknown };
}
