const RichText = window.PCC.RichText;

RichText.ensureRenderStyles = function () {
	if (document.getElementById('pcc-richtext-render-styles')) {
		return;
	}

	const style = document.createElement('style');
	style.id = 'pcc-richtext-render-styles';
	style.textContent = `
		.generated-content {
			padding: 4px 8px;
			min-height: 50px;
		}
	`;

	document.head.appendChild(style);
};

RichText.renderResponses = function (fields, options) {
	if (!Array.isArray(fields)) {
		console.warn('PCC.RichText.renderResponses expected an array of fields.');
		return;
	}

	const settings = Object.assign({
		renderClass: 'generated-content',
		clearOriginal: true,
		injectStyles: true
	}, options || {});

	if (settings.injectStyles) {
		RichText.ensureRenderStyles();
	}

	fields.forEach(function (field) {
		if (!field || !field.export) {
			console.warn('PCC.RichText.renderResponses skipped invalid field config:', field);
			return;
		}

		const container = document.querySelector(`div[data-export="${field.export}"]`);

		if (!container) {
			console.warn(`PCC.RichText.renderResponses could not find field for export "${field.export}"`);
			return;
		}

		const inputElement = container.querySelector('input');

		if (!inputElement) {
			console.warn(`PCC.RichText.renderResponses could not find input for export "${field.export}"`);
			return;
		}

		const formResponsesDiv = inputElement.closest('div.form_responses');

		if (!formResponsesDiv) {
			console.warn(`PCC.RichText.renderResponses could not find form_responses for export "${field.export}"`);
			return;
		}

		let rendered = container.querySelector(`.${settings.renderClass}`);

		if (!rendered) {
			rendered = document.createElement('div');
			rendered.classList.add(settings.renderClass);
			formResponsesDiv.after(rendered);
		}

		rendered.innerHTML = inputElement.value;

		if (settings.clearOriginal) {
			formResponsesDiv.innerText = '';
		}
	});
};
