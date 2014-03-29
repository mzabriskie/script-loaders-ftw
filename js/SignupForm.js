define(['./FormProcessor', './FormValidator'], function (Processor, Validator) {
	var form = null,
		processor = null,
		validator = null;

	function showForm() {
		document.body.appendChild(getForm());
	}

	function hideForm() {
		if (form !== null && form.parentNode !== null) {
			form.parentNode.removeChild(form);
		}
	}

	function submitForm() {
		if (getValidator().validate()) {
			getProcessor().process();
		}
	}
	
	function getForm() {
		if (form === null) {
			form = document.createElement('form');
			form.className = 'form-horizontal';
			form.innerHTML =
					'<p id="message"></p>' +
					'<div class="form-group">' +
						'<label for="fname" class="col-sm-2 control-label">First Name</label>' +
						'<div class="col-sm-8"><input id="fname" class="form-control"/></div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="lname" class="col-sm-2 control-label">Last Name</label>' +
						'<div class="col-sm-8"><input id="lname" class="form-control"/></div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="email" class="col-sm-2 control-label">Email Address</label>' +
						'<div class="col-sm-8"><input id="email" type="email" class="form-control"/></div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="password" class="col-sm-2 control-label">Password</label>' +
						'<div class="col-sm-8"><input id="password" type="password" class="form-control"></div>' +
					'</div>' +
					'<div class="form-group">' +
						'<div class="col-sm-offset-2 col-sm-8">' +
							'<button type="submit" class="btn btn-primary">Save</button>\n' +
							'<button class="btn btn-default">Cancel</button>' +
						'</div>' +
					'</div>';

			form.onsubmit = function (e) {
				e.preventDefault();
				submitForm();
			};

			form.querySelector('button:nth-of-type(2)').onclick = function (e) {
				e.preventDefault();
				hideForm();
			};
		}
		return form;
	}

	function getProcessor() {
		if (processor === null) {
			processor = new Processor(getForm());
			processor.on('success', function () {
				setMessage('You\'re all signed up!', 'success');
			});
			processor.on('failure', function (e) {
				setMessage(e, 'danger');
			});
		}
		return processor;
	}

	function getValidator() {
		if (validator === null) {
			validator = new Validator(getForm());
		}
		return validator;
	}

	function setMessage(text, type) {
		var msg = document.getElementById('message');
		msg.innerHTML = text;
		msg.className = 'container alert alert-' + type;
	}

	return {
		show: showForm,
		hide: hideForm,
		submit: submitForm
	};
});
