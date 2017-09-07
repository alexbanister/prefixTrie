const { expect } = require('chai');
const PrefixTrieNode = require('../scripts/PrefixTrieNode');

describe('Node', () => {
  it('should have a letter', () => {
    let node = new PrefixTrieNode('l');

    expect(node.letter).to.equal('l');
  });

  it('end of word should default to false', () => {
    let node = new PrefixTrieNode('l');

    expect(node.endOfWord).to.equal(false);
  });

  it('should have a selected value of 0', () => {
    let node = new PrefixTrieNode('l');

    expect(node.selected).to.equal(0);
  });
})
