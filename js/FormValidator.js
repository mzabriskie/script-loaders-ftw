define(function () {
	function FormValidator(form) {
		this.form = form;
	}

	FormValidator.prototype.validate = function () {
		return true;
	};

	return FormValidator;
});
