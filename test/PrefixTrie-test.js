const { assert } = require('chai');
const PrefixTrie = require('../scripts/PrefixTrie');
const fs = require('fs');
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('PrefixTrie', () => {
  let tree;

  beforeEach(() => {
    tree = new PrefixTrie();
  });

  describe('add word', () => {
    it('should add a word', function () {
      tree.addWord('fuzzy');

      assert.equal(tree.root.f.letter, 'f');
      assert.equal(tree.root.f.u.letter, 'u');
      assert.equal(tree.root.f.u.z.z.y.letter, 'y');
    });

    it('should add multiple words', function () {
      tree.addWord('fuzzy');
      tree.addWord('funny');
      tree.addWord('full');
      tree.addWord('duck');

      assert.equal(tree.root.f.letter, 'f');
      assert.equal(tree.root.f.u.z.z.letter, 'z');
      assert.equal(tree.root.f.u.n.n.y.letter, 'y');
      assert.equal(tree.root.f.u.l.l.letter, 'l');
      assert.equal(tree.root.d.u.c.k.letter, 'k');
    });

    it('should have subset words', function () {
      tree.addWord('fuzzy');
      tree.addWord('fuzz');

      assert.equal(tree.root.f.letter, 'f');
      assert.equal(tree.root.f.u.z.z.endOfWord, true);
      assert.equal(tree.root.f.u.z.z.y.endOfWord, true);
    });
  });

  describe('get words', () => {
    it('should find one completed word', function () {
      tree.addWord('fuzzy');

      assert.deepEqual(tree.getWords('fu'), ['fuzzy']);
    });

    it('should find multiple completed words', function () {
      tree.addWord('fuzzy');
      tree.addWord('funny');
      tree.addWord('full');
      tree.addWord('bunny');

      assert.deepEqual(tree.getWords('fu'), ['fuzzy', 'funny', 'full']);
    });

    it('should find subset completed words', function () {
      tree.addWord('fuzzy');
      tree.addWord('fuzz');

      assert.deepEqual(tree.getWords('fu'), ['fuzz', 'fuzzy']);
    });

    it('should return an empty array if no matches', function () {
      tree.addWord('fuzzy');
      tree.addWord('fuzz');

      assert.deepEqual(tree.getWords('la'), []);
    });
  });

  describe('select word', () => {
    it('should increment a selected word', function () {
      tree.addWord('fuzzy');
      tree.selectWord('fuzzy', 1);

      assert.equal(tree.root.f.u.z.z.y.selected, 1);

      tree.selectWord('fuzzy', 1);

      assert.equal(tree.root.f.u.z.z.y.selected, 2);
    });

    it('should decrement a selected word', function () {
      tree.addWord('fuzzy');
      tree.selectWord('fuzzy', 1);

      assert.equal(tree.root.f.u.z.z.y.selected, 1);

      tree.selectWord('fuzzy', -1);

      assert.equal(tree.root.f.u.z.z.y.selected, 0);
    });

    it('should sort by selected value', function () {
      tree.populate(dictionary);

      assert.deepEqual(tree.getWords('piz'), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

      tree.selectWord('pizzeria', 1);
      assert.deepEqual(tree.getWords('piz'), ["pizzeria", "pize", "pizza", "pizzicato", "pizzle"]);
    });
  });

  describe('populate dictionary', () => {
    it('should populate the tree from the dictionary', function () {
      tree.populate(dictionary);

      assert.equal(tree.wordCount, 235886);

      assert.deepEqual(tree.getWords('piz'), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
    });
  });
})
