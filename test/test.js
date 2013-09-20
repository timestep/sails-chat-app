var assert = require("assert")
// var should = require("should")


describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
    it('should return 1 when value is present',function(){
    	assert.equal(1,[1,2,4].indexOf(2));
    })
    it('should fail',function(){
    	assert.notEqual(1,3);
    })
  })
})


