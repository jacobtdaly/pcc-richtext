const RichText = window.PCC.RichText;

RichText.getFieldIdFromExport = function (exportName) {
	const container = document.querySelector(`div[data-export="${exportName}"]`);

	if (!container || !container.dataset || !container.dataset.id) {
		return null;
	}

	return `form_${container.dataset.id}`;
};
