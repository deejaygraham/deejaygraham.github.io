const elasticlunr = require('elasticlunr');
const HTMLParser = require('node-html-parser');
const fs = require('fs');

/**
 * Create a digest of the page text suitable for inclusion in search.
 * Remove common words, repeated words
 * @param {} text 
 * @returns {} 
 */
const squash = (text) => {
  const lowerCased = new String(text).toLowerCase();

  // remove all html elements and new lines
  const htmlElementMatcher = /(<.*?>)/gi;
  const plainText = unescape(lowerCased.replace(htmlElementMatcher, ''));

  // remove punctuation but leave full stops in place so that code namespaces are maintained.
  const punctuationMatcher = /\,|\?|-|—|\n|\r|\t|{|}/g;
  const unpunctuatedText = plainText.replace(punctuationMatcher, ' ');

  // remove duplicated words
  const words = unpunctuatedText.split(' ');
//  console.log("words ", words);
  const uniqueWordList = [...(new Set(words))];
//  console.log("unique words ", uniqueWordList);
  const uniqueWords = uniqueWordList.join(' ')

  //console.log("word list " + uniqueWords);

  // remove short and less meaningful words
  const unneededWordMatcher =
    /\b(a|an|and|am|also|by|you|I|to|if|of|off|they|those|with|which|from|are|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for|how|to|the|such|now)\b/gi;

  let interestingWords = uniqueWords.replace(unneededWordMatcher, '');
//  console.log("*** interesting list " + interestingWords);

  const programmingTermMatcher =  /\b(begin|end|assumptions|assume|been|click|example|true|false|summary|item|value|page|this|use)\b/gi;
  interestingWords = interestingWords.replace(programmingTermMatcher, '');
//  console.log("*** interesting list2 " + interestingWords);
  
  //remove repeated spaces
  interestingWords = interestingWords.replace(/[ ]{2,}/g, ' ');

//  console.log("interesting list " + interestingWords);

  return interestingWords;
  // return interestingWords.substring(0,5000);
};

/**
 * After the main documentation is built, shortcodes expanded and source 
 * examples included, we examine each file and build a search index json 
 * database which is ingested by lunr during live search of the site.
 */
module.exports = function({ dir, results }) {

  console.log("Generating search index");

  const index = elasticlunr(function() {
    this.setRef('id');

    this.addField('title');
    this.addField('keywords');
  });

  results.forEach((page) => {

    // change to relative path
    const id = page.url.replace("/html/", "./");

    const doc = HTMLParser.parse(page.content);
    const titleNode = doc.querySelector('#doc-title');
    const contentNode = doc.querySelector('#doc-content');

    const feedbackNode = doc.querySelector('#feedback-section');

    // don't need feedback node
    if (feedbackNode) {
      feedbackNode.remove();
    }

    if (contentNode) {
      const title = titleNode.innerText;
      const searchText = squash(contentNode.textContent);

      index.addDoc({
        id,
        title,
        keywords: searchText.split(' '),
      });
    }
  });

  const json = JSON.stringify(index);
//  console.log(json);
  fs.writeFileSync(dir.output + '/search-index.json', json);

  console.log("Search index complete");
};
