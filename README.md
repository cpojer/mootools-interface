Interface - Copyright (c) 2010 [Christoph Pojer](http://cpojer.net/)
=====================================================================================

Interfaces for Class to ensure certain properties are defined.

Only works with MooTools 1.3.0+.

Checks *after* creating an instance of a MooTools Class.

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires MooTools Core to be registered to Packager already

	./packager register /path/to/interface
	./packager build Interface/* > interface.js

How to use
----------

See Demos/Example.js

ToDo
----

* Currently it creates a mutator for the initialize method which is horribly ugly, wrong usage of the system and always requires to define an initialize method. This will be fixed in the future. Please forgive me. The API however should be pretty much feature complete.
* Provide a simple way to disable the checks for non-debug mode