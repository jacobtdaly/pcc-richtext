window.PCC = window.PCC || {};
window.PCC.RichText = window.PCC.RichText || {};

const RichText = window.PCC.RichText;

RichText.version = __VERSION__;

RichText.defaults = {
	profile: 'full',
	height: 300,
	fullPage: false
};

RichText.getEditorConfig = function (field) {
	const config = Object.assign({}, RichText.defaults, field);

	return {
		filebrowserImageBrowseUrl: '/fw/framework/ckfinder/ckfinder.html?type=Images&connector=' + encodeURIComponent('/www/'),
		filebrowserBrowseUrl: '/fw/framework/ckfinder/ckfinder.html?type=Documents&connector=' + encodeURIComponent('/www/'),
		fullPage: config.fullPage,
		height: config.height,
		toolbar: CKEDITOR.getToolbar(config.profile),

		entities: true,
		basicEntities: true,
		entities_latin: true,
		entities_greek: true,
		entities_processNumerical: 'force'
	};
};
