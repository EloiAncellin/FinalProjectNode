var assert = require('assert');
var sum = require('../utils/sum.js')

describe('Some simple test', () => {
    it('should return sum', () => {
        assert.strictEqual(sum(1, 1), 2);
    });
});
