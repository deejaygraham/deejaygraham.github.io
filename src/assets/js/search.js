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
      results.map((result) => {

        if (result.doc){
          const { id, title } = result.doc;
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
  
        }
        else {
          const el = document.createElement("li");
          container.appendChild(el);
        }
      });
    } else {
      container.innerHTML = "<p>No results found</p>";
    }
  };

  fetch("/search-index.json").then((response) =>
    response.json().then((jsonIndex) => {
      window.searchIndex = elasticlunr.Index.load(jsonIndex);
      document.getElementById("search-box").addEventListener("input", search);
    })
  );
})(window, document);
