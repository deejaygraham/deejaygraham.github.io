/* global elasticlunr */
"use strict";

const ignoreEnterKey = (e) => {
    if (e.keyCode === 13) {
    e.preventDefault();
    }    
};

const formatLink = (document, url, text) => {
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.textContent = text;
    return link;
};

const formatMessageHeader = (document, url, title) => {
    const link = formatLink(document, url, title);
    const titleEl = document.createElement("p");
    titleEl.appendChild(link);

    const messageHeader = document.createElement("div");
    messageHeader.setAttribute("class", "message-header");
    
    messageHeader.appendChild(titleEl);
    return messageHeader;
};

const formatMessageBody = (document, text) => {
    const messageBody = document.createElement("div");
    messageBody.setAttribute("class", "message-body");
    messageBody.innerHTML = text;
    return messageBody;
};

const formatMessage = (document, url, title, text) => {
    const header = formatMessageHeader(document, url, title);
    const body = formatMessageBody(document, text);

    const message = document.createElement("article");
    message.setAttribute("class", "message");

    message.appendChild(header);
    message.appendChild(body);

    return message;
}

const formatResult = (document, url, title, text) => {
    return formatMessage(document, url, title, text);
};

const displayResults = (searchTerm, results) => {
    const container = document.getElementById("search-results");    
    container.innerHTML = "";

    if (Array.isArray(results) && results.length > 0) {
        results.forEach(({ ref }) => {
            const result = window.searchIndex.documentStore.getDoc(ref);

            const formattedResult = formatResult(document, result.id, result.title, result.excerpt);    
            container.appendChild(formattedResult);
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
        fields: {
            title: {boost: 2, bool: "AND"},
            excerpt: {boost: 1}
        },
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
