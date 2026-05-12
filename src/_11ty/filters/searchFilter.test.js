import test from "ava";
import searchFilter from "./searchFilter.js";

/**
 * @param {{
 *   url: string;
 *   title: string;
 *   excludeFromSitemap?: boolean;
 *   draft?: boolean;
 *   layout?: string;
 *   body?: string;
 *   attribution?: string;
 * }} opts
 */
function mockPost(opts) {
  const {
    url,
    title,
    excludeFromSitemap = false,
    draft = false,
    layout = "post",
    body = "post body",
    attribution,
  } = opts;

  const fm = { title, layout, tags: ["meta"] };
  if (attribution) {
    fm.attribution = attribution;
  }

  return {
    url,
    data: {
      tags: ["meta"],
      draft,
      excludeFromSitemap,
    },
    rawInput: `---\ntitle: ${title}\nlayout: ${layout}\ntags: [meta]\n---\n${body}`,
    template: {
      read: async () => ({ data: { ...fm } }),
    },
  };
}

test("searchFilter omits pages with excludeFromSitemap", async (t) => {
  const unique = "SEARCH_FILTER_EXCLUDE_TOKEN_ZZ9";
  const included = mockPost({ url: "/keep-this/", title: "Visible Post", body: "alpha beta" });
  const excluded = mockPost({
    url: "/drop-this/",
    title: unique,
    body: `${unique} should never be indexed`,
    excludeFromSitemap: true,
  });

  const json = await searchFilter([included, excluded]);

  t.truthy(json.documentStore.docs["/keep-this/"], "included post should be in the index");
  t.falsy(json.documentStore.docs["/drop-this/"], "excludeFromSitemap post must not be in the index");
  t.false(JSON.stringify(json).includes(unique), "serialized index must not contain excluded title or body");
});

test("searchFilter omits pages with draft: true", async (t) => {
  const unique = "SEARCH_FILTER_DRAFT_TOKEN_QQ7";
  const included = mockPost({ url: "/published/", title: "Published", body: "ok" });
  const draft = mockPost({
    url: "/draft-only/",
    title: unique,
    body: unique,
    draft: true,
  });

  const json = await searchFilter([included, draft]);

  t.truthy(json.documentStore.docs["/published/"]);
  t.falsy(json.documentStore.docs["/draft-only/"]);
  t.false(JSON.stringify(json).includes(unique));
});
