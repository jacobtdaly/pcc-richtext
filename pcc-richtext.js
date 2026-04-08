(function (window, document) {
	'use strict';

	window.PCC = window.PCC || {};
	window.PCC.RichText = window.PCC.RichText || {};

	const RichText = window.PCC.RichText;

	RichText.version = '0.1.1';

	RichText.defaults = {
		profile: 'full',
		height: 300
	};

	RichText.getFieldIdFromExport = function (exportName) {
		const container = document.querySelector(`div[data-export="${exportName}"]`);

		if (!container || !container.dataset || !container.dataset.id) {
			return null;
		}

		return `form_${container.dataset.id}`;
	};

	RichText.attachField = function (field) {
		if (!field || !field.export) {
			console.warn('PCC.RichText.attachField skipped invalid field config:', field);
			return;
		}

		const config = Object.assign({}, RichText.defaults, field);
		const fieldId = RichText.getFieldIdFromExport(config.export);

		if (!fieldId) {
			console.warn(`PCC.RichText could not find field for export "${config.export}"`);
			return;
		}

		const element = document.getElementById(fieldId);

		if (!element) {
			console.warn(`PCC.RichText found export "${config.export}" but not textarea "${fieldId}"`);
			return;
		}

		console.log('PCC.RichText.attachField ready', {
			export: config.export,
			fieldId: fieldId,
			profile: config.profile,
			height: config.height
		});
	};

	RichText.attachFields = function (fields) {
		if (!Array.isArray(fields)) {
			console.warn('PCC.RichText.attachFields expected an array.');
			return;
		}

		fields.forEach(function (field) {
			RichText.attachField(field);
		});
	};

})(window, document);