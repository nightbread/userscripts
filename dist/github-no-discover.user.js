'use strict';
// ==UserScript==
// @name         No Discover
// @version      0.2.0
// @description  Hide the Discover section.
// @match        https://github.com
// @match        https://github.com/dashboard
// @grant        none
// @run-at       document-end
// @noframes
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/github-no-discover.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/github-no-discover.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
const col = document.querySelector(
  '.application-main > .d-md-flex.color-bg-inset > .flex-auto > .gutter-md-spacious > div',
);
if (col) {
  col.querySelector('.mx-auto')?.setAttribute('style', '');
  for (const cl of Array.from(col.classList)) {
    if (/^col-/.test(cl)) {
      col.classList.remove(cl);
    }
  }
  col.classList.add('col-12');
}
document.querySelector('[aria-label="Explore"]')?.remove();
