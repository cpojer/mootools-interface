(function(){

var Moo = (require('../../mootools-core/Source/MooTools')).instanceOf;

// MooTools 2.0 specific instanceOf check
jasmine.Matchers.prototype.toBeA = function(expected){
  return instanceOf(this.actual, expected);
};

})();