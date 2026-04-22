(() => {
  // src/config.js
  window.PCC = window.PCC || {};
  window.PCC.RichText = window.PCC.RichText || {};
  var RichText = window.PCC.RichText;
  RichText.version = "0.1.3";
  RichText.defaults = {
    profile: "full",
    height: 300,
    fullPage: false
  };
  RichText.getEditorConfig = function(field) {
    const config = Object.assign({}, RichText.defaults, field);
    return {
      filebrowserImageBrowseUrl: "/fw/framework/ckfinder/ckfinder.html?type=Images&connector=" + encodeURIComponent("/www/"),
      filebrowserBrowseUrl: "/fw/framework/ckfinder/ckfinder.html?type=Documents&connector=" + encodeURIComponent("/www/"),
      fullPage: config.fullPage,
      height: config.height,
      toolbar: CKEDITOR.getToolbar(config.profile),
      entities: true,
      basicEntities: true,
      entities_latin: true,
      entities_greek: true,
      entities_processNumerical: "force"
    };
  };

  // src/fields.js
  var RichText2 = window.PCC.RichText;
  RichText2.getFieldIdFromExport = function(exportName) {
    const container = document.querySelector(`div[data-export="${exportName}"]`);
    if (!container || !container.dataset || !container.dataset.id) {
      return null;
    }
    return `form_${container.dataset.id}`;
  };

  // src/loader.js
  var RichText3 = window.PCC.RichText;
  RichText3.ensureCkeditor = function(callback) {
    if (window.CKEDITOR) {
      callback();
      return;
    }
    if (window.FW && typeof FW.Require === "function") {
      FW.Require("ckeditor.js?v=" + FW.Version, callback);
      return;
    }
    console.error("PCC.RichText could not load CKEditor. FW.Require is unavailable.");
  };

  // src/editor.js
  var RichText4 = window.PCC.RichText;
  RichText4.attachField = function(field) {
    if (!field || !field.export) {
      console.warn("PCC.RichText.attachField skipped invalid field config:", field);
      return;
    }
    const fieldId = RichText4.getFieldIdFromExport(field.export);
    if (!fieldId) {
      console.warn(`PCC.RichText could not find field for export "${field.export}"`);
      return;
    }
    const element = document.getElementById(fieldId);
    if (!element) {
      console.warn(`PCC.RichText found export "${field.export}" but not textarea "${fieldId}"`);
      return;
    }
    if (window.CKEDITOR && CKEDITOR.instances && CKEDITOR.instances[fieldId]) {
      CKEDITOR.remove(CKEDITOR.instances[fieldId]);
    }
    CKEDITOR.replace(fieldId, RichText4.getEditorConfig(field));
  };
  RichText4.attachFields = function(fields) {
    if (!Array.isArray(fields)) {
      console.warn("PCC.RichText.attachFields expected an array.");
      return;
    }
    RichText4.ensureCkeditor(function() {
      fields.forEach(function(field) {
        RichText4.attachField(field);
      });
    });
  };
})();
