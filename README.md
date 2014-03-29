# When Are Script Loaders Needed?

The question was posed ["When Are Script Loaders Needed?"](https://twitter.com/Souders/status/449237781508669440). I want to throw in my 2¢ of why I believe script loaders are beneficial. I will use [RequireJS](http://www.requirejs.org) in my examples, although there are [other script loaders](http://www.creativebloq.com/javascript/essential-javascript-top-five-script-loaders-8122862) which would work just as well.

I believe that there are four main benefits to using a script loader: managing script dependencies, preventing global scope pollution, hiding private objects and improving page load performance.

I have included a rudimentary example and will be referencing this example as I discuss the benefits.

## Managing Script Dependencies

One of the greatest benefits of using a script loader is that it mitigates the complexity of loading all the dependencies for a module.

Imagine that you have a module containing a signup form for your site. Your top level script file is `SignupForm.js` which has two dependencies `FormProcessor.js` and `FormValidator.js`. `FormProcessor.js` itself has two dependencies `Events.js` and `Util.js`.

Loading all these scripts could be done using traditional `<script>` tags:

```html
<!-- load these first since FormProcessor depends on them -->
<script src="Events.js"></script>
<script src="Utils.js"></script>

<!-- load these second since SignupForm depends on them -->
<script src="FormProcessor.js"></script>
<script src="FormValidator"></script>

<!-- finally load the module itself -->
<script src="SignupForm.js"></script>
```

The disadvantage here is that it leaves the complexity of ensuring that all the scripts are loaded and in the right order to the developer that is consuming your module.

By using a script loader you can make things much easier for whomever consumes your module:

```html
<!-- just load the module, it will take care of the rest -->
<script>
	require(['./SignupForm'], function (SignupForm) {
		/* ... */
	});
</script>
``` 

## Preventing Global Scope Pollution

A common problem developers run into with JavaScript is pollution of the global scope. All too often libraries add objects to the global scope that collide with existing objects of the same name. This is why jQuery and other libraries make use of the `noConflict` method.

If you were to create a signup form module using standard script tags for loading your source you will  ultimately have to add the object to the global scope:

```js
var SignupForm = { /* ... */ };
```

This will make `SignupForm` accessible to other scripts once included on the page, but explicitly adds the object to `window` using the name `SignupForm`. If there were another object already on `window` with the same name, it just got overwritten.

By using a script loader this global scope pollution is avoided:

```js
define(['./FormProcessor', './FormValidator'], function (Processor, Validator) {
	return {
		/* ... */
	};
});
```

Here with the script loader we never even gave `SignupForm` a name and it was never added to the global scope. Further you can see by the dependencies pulled in by `SignupForm`, once they are loaded we can alias them to be called whatever we want.

## Hiding Private Objects

This goes hand in hand with the global scope pollution problem. When defining a variable it either ends up on the global scope, or the local function/closure scope. If you have objects that you don't want accessible outside of you really only have one option; wrap it in a function.

Traditionally this has been handled by using a closure:

```js
var SignupForm = (function () {
	function __thisIsPrivate() { /* ... */ }

	return {
		/* ... */
	};
})();
```

By doing this anything within the closure has access to `__thisIsPrivate`, but nothing outside does.

Script loaders facilitate this same behavior. They take it a step further though by enforcing it by requiring you to explicitly declare what you want exported.

```js
define(function () {
	function __thisIsPrivate() { /* ... */ }
	
	function thisIsPublic() { /* ... */ }

	// by using the revealing module pattern we control what is accessible
	return {
		myPublicFn: thisIsPublic
	};
});
```

## Improving Page Load Performance

As more and more complex applications are built as single page applications, it becomes more impracticle to load all the source for the application upon page load. It would be an unecesarry hit on performance to load hundreds of unused modules. A preferable way to handle this is to load the modules as needed.

```js
document.getElementById('signup-button').onclick = function () {
	require(['./SignupForm'], function (Form) {
		Form.show();
	});
};
```

By only loading the `SignupForm` module once it's actually needed we have deferred the overhead of loading the module from load time. Furthermore if the user never clicks the signup button we haven't incurred the overhead at all.

# Example

As mentioned I have included a basic signup form module. It is in no way functional, just provides a quick and dirty example of the points that have been discussed.