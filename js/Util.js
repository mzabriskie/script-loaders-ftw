define(function () {
	function inherits(child, parent) {
		for (var k in parent) {
			if (parent.hasOwnProperty(k)) {
				child[k] = parent[k];
			}
		}

		function ctor() {
			this.constructor = child;
		}

		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		return child;
	}

	return {
		inherits: inherits
	};
});
