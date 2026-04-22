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
  (function(window2) {
    "use strict";
    window2.PCC = window2.PCC || {};
    window2.PCC.RichText = window2.PCC.RichText || {};
    const RichText3 = window2.PCC.RichText;
    RichText3.ensureCkeditor = function(callback) {
      if (window2.CKEDITOR) {
        callback();
        return;
      }
      if (window2.FW && typeof FW.Require === "function") {
        FW.Require("ckeditor.js?v=" + FW.Version, callback);
        return;
      }
      console.error("PCC.RichText could not load CKEditor. FW.Require is unavailable.");
    };
  })(window);

  // src/editor.js
  (function(window2, document2) {
    "use strict";
    window2.PCC = window2.PCC || {};
    window2.PCC.RichText = window2.PCC.RichText || {};
    const RichText3 = window2.PCC.RichText;
    RichText3.attachField = function(field) {
      if (!field || !field.export) {
        console.warn("PCC.RichText.attachField skipped invalid field config:", field);
        return;
      }
      const fieldId = RichText3.getFieldIdFromExport(field.export);
      if (!fieldId) {
        console.warn(`PCC.RichText could not find field for export "${field.export}"`);
        return;
      }
      const element = document2.getElementById(fieldId);
      if (!element) {
        console.warn(`PCC.RichText found export "${field.export}" but not textarea "${fieldId}"`);
        return;
      }
      if (window2.CKEDITOR && CKEDITOR.instances && CKEDITOR.instances[fieldId]) {
        CKEDITOR.remove(CKEDITOR.instances[fieldId]);
      }
      CKEDITOR.replace(fieldId, RichText3.getEditorConfig(field));
    };
    RichText3.attachFields = function(fields) {
      if (!Array.isArray(fields)) {
        console.warn("PCC.RichText.attachFields expected an array.");
        return;
      }
      RichText3.ensureCkeditor(function() {
        fields.forEach(function(field) {
          RichText3.attachField(field);
        });
      });
    };
  })(window, document);
})();
