define(['./Events', './Util'], function (Events, Util) {
	function FormProcessor(form) {
		this.form = form;
	}

	Util.inherits(FormProcessor, Events);

	FormProcessor.prototype.process = function () {
		this.emit('success');
	};

	return FormProcessor;
});
