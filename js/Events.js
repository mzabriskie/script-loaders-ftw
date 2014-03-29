define(function () {
	function _registry(e) {
		if (typeof e.registry === 'undefined') {
			e.registry = {};
		}
		return e.registry;
	}

	function Events() {}

	Events.prototype.on = function (type, handler) {
		var r = _registry(this)[type];
		if (typeof r === 'undefined') {
			r = this.registry[type] = [];
		}
		r.push(handler);
	};

	Events.prototype.emit = function (type) {
		var r = _registry(this)[type];
		if (typeof r !== 'undefined') {
			for (var i=0, l=r.length; i<l; i++) {
				r[i].call(null);
			}
		}
	};

	return Events;
});
