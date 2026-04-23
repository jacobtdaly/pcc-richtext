# PCC RichText

[![GitHub release](https://img.shields.io/github/v/release/postcaptain/pcc-richtext)](https://github.com/postcaptain/pcc-richtext/releases)

A lightweight, reusable library for enhancing Slate (Technolutions) textarea fields with:

- CKEditor WYSIWYG editing
- Clean HTML rendering in view mode
- Consistent entity handling (numeric entities)
- Centralized configuration via CDN

---

## 🚀 Features

- Attach CKEditor to specific Slate fields
- Render stored HTML cleanly in non-edit views
- Versioned CDN delivery via jsDelivr
- Modular architecture with build pipeline (esbuild + GitHub Actions)
- Profile-based toolbar control (`full`, `basic`, extensible)
- Automatic numeric HTML entity handling for safe storage/rendering

---

## ⚡ Quick Start (Slate)

### ✏️ Edit Page (WYSIWYG)

Turn a form field into a rich text block. Paste the following into a Custom Script block:

```javascript
$.getScript('https://cdn.jsdelivr.net/gh/postcaptain/pcc-richtext@0.9.1/dist/pcc-richtext.js')
  .done(function () {
    PCC.RichText.attachFields([
      { export: 'FORM FIELD 1 EXPORT KEY HERE', height: 300, profile: 'full' },
      { export: 'FORM FIELD 2 EXPORT KEY HERE', height: 300, profile: 'basic' },
      { export: 'FORM FIELD 3 EXPORT KEY HERE', height: 300, profile: 'basic' }
    ]);
  });
  ````

### 👀 View Page (Render HTML)

When viewing a form (like on a custom tab) that has saved html, turn it back into displayed content. Paste the following into an Instructions block on the form:

```html
<script>
$.getScript('https://cdn.jsdelivr.net/gh/postcaptain/pcc-richtext@0.9.1/dist/pcc-richtext.js')
  .done(function () {
    PCC.RichText.renderResponses([
      { export: 'FORM FIELD 1 EXPORT KEY HERE' },
      { export: 'FORM FIELD 2 EXPORT KEY HERE' }
    ]);
  });
</script>
````

## 📦 Installation (CDN)

Load the library from jsDelivr using a specific version:

https://cdn.jsdelivr.net/gh/postcaptain/pcc-richtext@0.9.1/dist/pcc-richtext.js

Always use explicit versions, not `@main`.

```javascript
$.getScript('https://cdn.jsdelivr.net/gh/postcaptain/pcc-richtext@0.9.1/dist/pcc-richtext.js');
````
---

## ✏️ Usage — Edit Mode

Call `PCC.RichText.attachFields()` with a list of Slate fields.

````javascript
PCC.RichText.attachFields([
  { export: 'FORM FIELD 1 EXPORT KEY', height: 300, profile: 'full' },
  { export: 'FORM FIELD 2 EXPORT KEY', height: 300, profile: 'basic' }
]);
````

Example usage:

- Target fields by their `export` name
- Optionally set `height` and `profile`

### Options per field

| Option     | Description |
|-----------|------------|
| export    | Slate field export name (required) |
| height    | Editor height in pixels |
| profile   | Toolbar profile (`full`, `basic`) |
| fullPage  | Enable full-page editing (default: false) |

---

## 👀 Usage — View Mode

Call `PCC.RichText.renderResponses()` with the same field list.

````javascript
PCC.RichText.renderResponses([
  { export: 'FORM FIELD 1 EXPORT KEY' },
  { export: 'FORM FIELD 2 EXPORT KEY' }
]);
````

This will:

- Read stored HTML from Slate inputs
- Inject rendered HTML into the page
- Hide the original raw content
- Apply basic styling automatically

---

## 🎛️ Toolbar Profiles

Profiles allow you to control editor toolbars without exposing CKEditor details to page code.

### Built-in profiles

````javascript
profile: 'full'
profile: 'basic'
````

### Internals

````javascript
RichText.profiles = {
  full: () => CKEDITOR.getToolbar('full'),
  basic: () => CKEDITOR.getToolbar('basic')
};
````

Profiles map to CKEditor toolbars internally. This allows:

- Changing toolbar behavior centrally
- Adding new profiles later
- Supporting future editor upgrades without rewriting page scripts

---

## ⚙️ Defaults

Default editor configuration:

- profile: full
- height: 300
- fullPage: false
````javascript
RichText.defaults = {
  profile: 'full',
  height: 300,
  fullPage: false
};
````
These can be overridden per field.

---

## 🧠 Architecture
````
src/
- namespace.js
- config.js
- fields.js
- loader.js
- editor.js
- render.js
- index.js

dist/
- pcc-richtext.js
````
---

## 🏗️ Build

Run:

````bash
npm install  
npm run build  
````
Output:
````
dist/pcc-richtext.js
````
---

## 🔁 Versioning

Version is controlled in:
````
package.json
````
It is automatically injected into the built file.

### Release workflow

1. Update version in package.json  
2. Commit and push  
3. Tag the version  
4. Push the tag  

Use that version in the CDN URL.

---

## ⚠️ Important Notes

### Use explicit versions

Avoid using @main in production.  
Always use a fixed version number.

---

### CKEditor dependency

- Relies on Slate’s CKEditor instance  
- Requires FW.Require to be available  

---

### HTML rendering

The library renders stored HTML directly into the page.
````javascript
rendered.innerHTML = inputElement.value;
````
This is intentional and expected behavior.

Only use with trusted content.

---

## 🔮 Future Enhancements

- Custom "lite" toolbar profile  
- CKEditor 5 support  
- autoInit helper  
- Configurable render styles  
- Global configuration overrides  

---

## 🧩 Philosophy

- Keep page scripts simple  
- Centralize complexity  
- Avoid per-form hacks  
- Build once, reuse everywhere  

---

## 🛠️ Maintained by

Post Captain Consulting  
https://postcaptain.com
