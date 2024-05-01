(function (window, document) {
  "use strict";

  const search = (e) => {

    const container = document.getElementById("search-results");
    container.innerHTML = "";
	  
    console.log("searching for: ", e.target.value);

    const results = window.searchIndex.search(e.target.value, 
    {
      bool: "OR",
      expand: true,
    });
	  
    if (Array.isArray(results) && results.length > 0) {
      results.forEach(({ ref }) => {
	const doc = window.searchIndex.documentStore.getDoc(ref);

	const articleLink = document.createElement("a");
        articleLink.setAttribute("href", doc.id);
        articleLink.textContent = doc.title;
	      
	const listItem = document.createElement("li");
	listItem.appendChild(articleLink);
        
	container.appendChild(listItem);
      });
    } else {
      container.innerHTML = "<p>Nothing to see here.</p>";
    }
  };

  fetch("/search-index.json").then((response) =>
    response.json().then((jsonIndex) => {
      window.searchIndex = elasticlunr.Index.load(jsonIndex);
      const searchBox = document.getElementById("search-box");
      searchBox.addEventListener("input", search);
      searchBox.focus();
    })
  );
})(window, document);
