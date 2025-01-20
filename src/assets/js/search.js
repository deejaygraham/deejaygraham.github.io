(function (window, document) {
  "use strict";

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }    
  };
	
  const search = (e) => {

    const container = document.getElementById("search-results");
    container.innerHTML = "";

    const searchTerm = e.target.value;
    //console.log("searching for: ", e.target.value);

    const results = window.searchIndex.search(searchTerm, 
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
      if (searchTerm) {
        container.innerHTML = "<p>Unable to find any posts for &quot;" + searchTerm + "&quot;.</p>";
      }
      else {
	container.innerHTML = "<p>Type something into the search box above.</p>";
      }
    }
  };

  fetch("/search-index.json").then((response) =>
    response.json().then((jsonIndex) => {
      window.searchIndex = elasticlunr.Index.load(jsonIndex);
      const searchBox = document.getElementById("search-box");
      searchBox.addEventListener("input", search);
      searchBox.addEventListener("keydown", keyPress);
      searchBox.focus();
    })
  );
})(window, document);
