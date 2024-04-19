(function (window, document) {
  "use strict";

  const search = (e) => {

    const container = document.getElementById("search-results");
    container.innerHTML = "";
	  
    const results = window.searchIndex.search(e.target.value, {
      bool: "OR",
      expand: true,
    });
	  
    if (results) {
      results.map((r) => {
        const { id, title } = r.doc;
        const el = document.createElement("li");
        container.appendChild(el);

        const h3 = document.createElement("h3");
        el.appendChild(h3);

        const a = document.createElement("a");
        a.setAttribute("href", id);
        a.textContent = title;
        h3.appendChild(a);

        //const p = document.createElement("p");
        //p.textContent = description;
        //el.appendChild(p);
      });
    } else {
      container.innerHTML = "<p>No results found";
    }
  };

  fetch("/search-index.json").then((response) =>
    response.json().then((rawIndex) => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      document.getElementById("search-box").addEventListener("input", search);
    })
  );
})(window, document);
