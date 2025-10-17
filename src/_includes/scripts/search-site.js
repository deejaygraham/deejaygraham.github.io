/* global elasticlunr */
"use strict";

const ignoreEnterKey = (e) => {
    if (e.keyCode === 13) {
    e.preventDefault();
    }    
};
  
const displayResults = (searchTerm, results) => {
    const container = document.getElementById("search-results");    
    container.innerHTML = "";

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
        let message = searchTerm 
            ? `Unable to find any posts for &quot;${searchTerm}&quot;`
            : 'Type something into the search box above'
    
        if (searchTerm.length <= 4) {
            message += ' (try typing more characters)';
        }

        container.innerHTML = `<p>${message}.</p>`;
    }
};

const executeSearch = (e) => {
    const searchTerm = e.target.value;
    // console.log("searching for: ", e.target.value);
    const results = window.searchIndex.search(searchTerm, 
    {
        bool: "AND",
        expand: true,
    });

    displayResults(searchTerm, results);
};

/* eslint-disable-next-line */
const loadSearchIndex = async () => {
    try {
        const searchIndexJsonDoc = "/search-index.json";
        const response = await fetch(searchIndexJsonDoc);
        const jsonIndex = await response.json();
        window.searchIndex = elasticlunr.Index.load(jsonIndex);

        const searchBox = document.getElementById("search-box");
        searchBox.addEventListener("input", executeSearch);
        searchBox.addEventListener("keydown", ignoreEnterKey);
        searchBox.focus();
    }
    catch(error) {
        console.error("Error loading search index:", error);
    }
};
