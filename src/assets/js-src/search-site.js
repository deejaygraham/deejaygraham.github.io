import elasticlunr from "../js/elasticlunr.min.cjs";

const ignoreEnterKey = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
};

/**
 * One search hit as a semantic article, styled like post cards.
 */
const formatResult = (document, url, title, excerpt) => {
  const article = document.createElement("article");
  article.className = "card search-result";

  const body = document.createElement("a");
  body.setAttribute("href", url);
  body.className = "card__body";

  const titleEl = document.createElement("h2");
  titleEl.className = "post-card-title";
  titleEl.textContent = title;
  body.appendChild(titleEl);

  if (excerpt) {
    const excerptEl = document.createElement("p");
    excerptEl.className = "text-muted";
    excerptEl.textContent = excerpt.replace(/<[^>]+>/g, "");
    body.appendChild(excerptEl);
  }

  article.appendChild(body);
  return article;
};

const displayResults = (searchTerm, results) => {
  const container = document.getElementById("search-results");
  container.innerHTML = "";

  if (Array.isArray(results) && results.length > 0) {
    results.forEach(({ ref }) => {
      const result = window.searchIndex.documentStore.getDoc(ref);
      const formattedResult = formatResult(
        document,
        result.id,
        result.title,
        result.excerpt,
      );
      container.appendChild(formattedResult);
    });
  } else {
    let message = searchTerm
      ? `Unable to find any posts for "${searchTerm}"`
      : "Type something into the search box above";

    if (searchTerm.length <= 4) {
      message += " (try typing more characters)";
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = `${message}.`;
    container.appendChild(paragraph);
  }
};

const executeSearch = (e) => {
  const searchTerm = e.target.value;
  const results = window.searchIndex.search(searchTerm, {
    fields: {
      title: { boost: 2, bool: "AND" },
      excerpt: { boost: 1 },
    },
    bool: "AND",
    expand: true,
  });

  displayResults(searchTerm, results);
};

export const loadSearchIndex = async (version = "") => {
  try {
    const searchIndexJsonDoc = version
      ? `/search-index.json?v=${encodeURIComponent(version)}`
      : "/search-index.json";
    const response = await fetch(searchIndexJsonDoc);
    const jsonIndex = await response.json();
    window.searchIndex = elasticlunr.Index.load(jsonIndex);

    const searchBox = document.getElementById("search-box");
    searchBox.addEventListener("input", executeSearch);
    searchBox.addEventListener("keydown", ignoreEnterKey);
    searchBox.focus();
  } catch (error) {
    console.error("Error loading search index:", error);
  }
};
