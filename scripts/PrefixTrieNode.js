
class PrefixTrieNode {
  constructor (letter) {
    this.letter = letter
    this.endOfWord = false;
    this.selected = 0;
  }
}

module.exports = PrefixTrieNode;
