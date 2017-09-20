const PrefixTrieNode = require('./PrefixTrieNode');

class PrefixTrie {
  constructor () {
    this.wordCount = 0;
    this.searchedWords = [];
    this.root = {};
    this.children = {};
  }

  count() {
    return this.wordCount;
  }

  addWord (word) {
    let letters = [ ...word.toLowerCase() ];

    let currentNode = this;

    for (let i = 0; i < letters.length; i++) {
      if (!currentNode.children[letters[i]]) {
        currentNode.children[letters[i]] = new PrefixTrieNode(letters[i]);
      }
      currentNode = currentNode.children[letters[i]];
    }
    if (currentNode.endOfWord === false) {
      currentNode.endOfWord = true;
      this.wordCount++;
    }
  }

  getWords (word) {
    this.searchedWords = [];
    let prefix = [ ...word.toLowerCase() ];
    let currentNode = this;

    while (prefix.length > 0) {
      let letter = prefix.shift();

      if (!currentNode.children[letter]) {
        return [];
      }
      currentNode = currentNode.children[letter];
    }
    let newWord = word.slice(0, -1);

    this.crawlWords(currentNode, newWord);


    return this.cleanSuggestions(this.searchedWords);
  }

  crawlWords (node, word) {
    let letters = Object.keys(node.children);

    // letters.splice(0, 3);

    if (node.endOfWord === true) {
      let newWord = word + node.letter;

      this.searchedWords.push( { word: newWord, selected: node.selected } );
    }
    for (let i = 0; i < letters.length; i++) {
      let growingWord = word + node.letter;

      this.crawlWords(node.children[letters[i]], growingWord);
    }
  }

  cleanSuggestions (suggestions) {
    let sorted = suggestions.sort( (a, b) => {
      return b.selected - a.selected;
    });

    return sorted.reduce( (accum, nodeThing) => {
      accum.push(nodeThing.word);
      return accum;
    }, []);
  }

  selectWord (word, value) {
    let letters = [ ...word.toLowerCase() ];
    let currentNode = this;

    for (var i = 0; i < letters.length; i++) {
      currentNode = currentNode.children[letters[i]];
    }
    currentNode.selected += value;
  }

  populate (dictionary) {
    dictionary.sort();

    dictionary.forEach( (word) => {
      this.addWord(word);
    });
    return this.wordCount;
  }
}

module.exports = PrefixTrie;
