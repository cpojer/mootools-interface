// An Animal that implements this interface must at least have the following properties
var IAnimal = new Interface({
	
	setEnergy: function(energy){}, // Must be function with at least one parameter
	
	getEnergy: Function,
	
	energy: Number, // Must be a number
	
	name: String,
	
	eat: function(animal){},
	
	die: Function
	
});

var Animal = new Class({
	
	Interface: IAnimal,
	
	initialize: function(name, age){
		this.name = name;
		this.age = age;
	},
	
	setEnergy: function(energy){
		this.energy = energy;
	},
	
	getEnergy: function(){
		return this.energy;
	},
	
	die: function(){
		this.energy = 0;
	}
	
});

// Example 1
var Tiger = new Class({
	
	Extends: Animal,
	
	energy: 10,
	
	eat: function(animal){
		if (!(animal instanceof Animal))
			return;
		
		this.parent(animal);
		animal.die();
	}
	
});

new Tiger('MyTiger'); // It works!


// Example 2
var Sheep = new Class({
	
	Extends: Animal,
	
	energy: 15,
	
	eat: function(animal){
		
	}
	
});

try {
	new Sheep(); // Throws because "name" is not a string
} catch (e){
	if (this.console) this.console.error(e);
}

// Example 3
var Squirrel = new Class({
	
	Extends: Animal,
	
	energy: 15,
	
	eat: function(){
		
	}
	
});

try {
	new Squirrel('John'); // Throws because the eat method does not have at least one expected argument
} catch (e){
	if (this.console) this.console.error(e);
}