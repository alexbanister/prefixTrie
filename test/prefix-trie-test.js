const { assert } = require('chai');
const blah = require('../scripts/prefix-trie');

describe('Auto Complete', () => {
  it('should return true', function () {
    assert.equal(blah(), true);
  });
})
