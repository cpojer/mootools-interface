/*
---

name: Interface

description: Interfaces for Class to ensure certain properties are defined.

authors: Christoph Pojer (@cpojer), Luis Merino (@Rendez)

license: MIT-style license.

requires: [Core/Type, Core/Class]

provides: Interface

...
*/

(function(context){

this.Interface = new Type('Interface', function(object){
	if (object.Implements){
		Array.from(object.Implements).each(function(item){
			Object.append(this, item);
		}, this);

		delete object.Implements;
	}
	
	return Object.append(this, object);
});

Class.Mutators.initialize = function(fn){
	return this.prototype.Interface ? function(){
		var result = fn.apply(this, arguments);

		if (!this.Interface) return result;

		var interfaces = Array.from(this.Interface);
		for (var i = 0; i < interfaces.length; i++){
			var iface = interfaces[i];
			for (var key in iface){
				if (key.charAt(0) == '$') continue; // Skip Internal
				
				if (!(key in this)) throw new Error('Instance does not implement "' + key + '"');
				
				var item = this[key],
					object = iface[key];
				
				if (object == null) continue;
				
				var type = typeOf(item),
					oType = typeOf(object);
				
				// Needs to be same datatype OR instance of the provided object
				if (type != oType && !instanceOf(item, object)){
					var proto = object.prototype,
						name = (proto && proto.$family) ? proto.$family().capitalize() : object.displayName;
					throw new Error('Property "' + key + '" is implemented but not an instance of ' + (name ? '"' + name + '"' : 'the expected type'));
				}
				
				if (oType == 'function' && item.$origin.length < object.length)
					throw new Error('Property "' + key + '" does not implement at least ' + object.length + ' parameter' + (object.length != 1 ? 's' : ''));
			}
		}

		return result;
	} : fn;
};

}).call(typeof exports != 'undefined' ? exports : this);
