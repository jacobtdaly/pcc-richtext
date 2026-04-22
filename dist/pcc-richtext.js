(() => {
  // src/namespace.js
  window.PCC = window.PCC || {};
  window.PCC.RichText = window.PCC.RichText || {};

  // src/config.js
  var RichText = window.PCC.RichText;
  RichText.version = "0.1.4";
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

  // src/render.js
  var RichText5 = window.PCC.RichText;
  RichText5.ensureRenderStyles = function() {
    if (document.getElementById("pcc-richtext-render-styles")) {
      return;
    }
    const style = document.createElement("style");
    style.id = "pcc-richtext-render-styles";
    style.textContent = `
		.generated-content {
			padding: 4px 8px;
			min-height: 50px;
			font-size: 16px;
		}
	`;
    document.head.appendChild(style);
  };
  RichText5.renderResponses = function(fields, options) {
    if (!Array.isArray(fields)) {
      console.warn("PCC.RichText.renderResponses expected an array of fields.");
      return;
    }
    const settings = Object.assign({
      renderClass: "generated-content",
      clearOriginal: true,
      injectStyles: true
    }, options || {});
    if (settings.injectStyles) {
      RichText5.ensureRenderStyles();
    }
    fields.forEach(function(field) {
      if (!field || !field.export) {
        console.warn("PCC.RichText.renderResponses skipped invalid field config:", field);
        return;
      }
      const container = document.querySelector(`div[data-export="${field.export}"]`);
      if (!container) {
        console.warn(`PCC.RichText.renderResponses could not find field for export "${field.export}"`);
        return;
      }
      const inputElement = container.querySelector("input");
      if (!inputElement) {
        console.warn(`PCC.RichText.renderResponses could not find input for export "${field.export}"`);
        return;
      }
      const formResponsesDiv = inputElement.closest("div.form_responses");
      if (!formResponsesDiv) {
        console.warn(`PCC.RichText.renderResponses could not find form_responses for export "${field.export}"`);
        return;
      }
      let rendered = container.querySelector(`.${settings.renderClass}`);
      if (!rendered) {
        rendered = document.createElement("div");
        rendered.classList.add(settings.renderClass);
        formResponsesDiv.after(rendered);
      }
      rendered.innerHTML = inputElement.value;
      if (settings.clearOriginal) {
        formResponsesDiv.innerText = "";
      }
    });
  };
})();
