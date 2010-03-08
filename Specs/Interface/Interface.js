(function(){

var Moo = require('../../../../mootools-core-two/Source/MooTools'),
	Class = Moo.Class,
	typeOf = Moo.typeOf,
	nil = Moo.nil;

var Interface = require('../Source/Interface').Interface;

describe('Interfaces', function(){
	it('should be of type interface', function(){
		expect(typeOf(new Interface({}))).toEqual('interface');
	});

	var TestClass = new Class({

		a: 1

	});
	
	TestClass.displayName = 'TestClass';

	TestClass.SubClass = new Class({

		Extends: TestClass,

		a: 2

	});

	xit('should work without initialize', function(){
		var Adapter = new Class({

			Interface: new Interface({

				method: function(){}

			})

		});

		expect(function(){
			new Adapter;
		}).toThrow('Instance does not implement "method"');
	});

	// Interfaces
	var IAdapter = new Interface({

		a: Number,

		method: Function,

		test: TestClass

	});

	var Adapter1 = new Class({

		Interface: IAdapter,

		a: 1,

		initialize: function(){},

		method: function(a){}

	});

	it('should fail if a property does not exist', function(){
		expect(function(){
			new Adapter1;
		}).toThrow('Instance does not implement "test"');
	});

	var Adapter2 = new Class({

		Extends: Adapter1,

		Interface: IAdapter,

		initialize: function(){
			this.test = new TestClass;
		}

	});

	it('should work if every property is implemented after initialize', function(){
		new Adapter2;
	});
	
	it('should work if a value is defined but empty', function(){
		new new Class({
			
			Extends: Adapter2,
			
			Interface: IAdapter,
			
			a: 0
			
		});
	});

	it('should fail if something is implemented but has the wrong type', function(){
		var Adapter3 = new Class({

			Extends: Adapter2,

			Interface: IAdapter,

			method: 'Not a function'

		});

		expect(function(){
			new Adapter3;
		}).toThrow('Property "method" is implemented but not an instance of "Function"');
	});

	it('should succeed if a property is a subclass of the expected', function(){
		var Adapter4 = new Class({

			Extends: Adapter2,

			Interface: IAdapter,

			initialize: function(){
				this.test = new TestClass.SubClass;
			}

		});

		new Adapter4;
	});

	it('should fail if an instance is not of the expected class', function(){
		var Adapter5 = new Class({

			Extends: Adapter2,

			Interface: IAdapter,

			initialize: function(){
				this.test = new (new Class({}));
			}

		});

		expect(function(){
			new Adapter5;
		}).toThrow('Property "test" is implemented but not an instance of "TestClass"');
	});

	var FunctionInterface = new Interface({

		method: function(a, b){}

	});

	it('should work if a function implements at least the required amount of parameters', function(){
		new new Class({

			Interface: FunctionInterface,

			initialize: function(){},

			method: function(a, b){}

		});

		new new Class({

			Interface: FunctionInterface,

			initialize: function(){},

			method: function(a, b, c){}

		});
	});

	it('should fail if a function implements less than the required amount of paramters', function(){
		var ImplementsFunction = new Class({

			Interface: FunctionInterface,

			initialize: function(){},

			method: function(a){}

		});

		expect(function(){
			new ImplementsFunction;
		}).toThrow('Property "method" does not implement at least 2 parameters');
	});

	it('should implement multiple Interfaces', function(){
		var ImplementsMultiple = new Class({

			Interface: [
				new Interface({

					method: function(){}

				}),

				new Interface({

					a: 1

				})
			],

			initialize: function(){},

			method: function(){}

		});

		expect(function(){
			new ImplementsMultiple;
		}).toThrow('Instance does not implement "a"');
	});

	it('should allow any value as long as the property exists', function(){
		[1, 'a', function(){}, ['a'], {a: 1}].each(function(v){
			var ImplementsNilAsAnything = new Class({

				Interface: new Interface({

					method: nil

				}),

				initialize: function(){},

				method: v

			});

			new ImplementsNilAsAnything;
		});
	});

	it('should be able to implement an Interface', function(){
		var iface = new Interface({

			Implements: IAdapter,

			value: Number

		});

		expect(iface).toEqual({

			$family: iface.$family, // Type
			$constructor: Interface, // Internal
			
			a: Number,

			method: Function,

			test: TestClass,

			value: Number

		});
	});

});

})();