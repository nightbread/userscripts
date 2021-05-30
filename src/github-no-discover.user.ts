// ==UserScript==
// @name         No Discover
// @version      0.1.0
// @description  Hide the Discover section.
// @match        https://github.com
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
  'body > div.application-main > .d-md-flex > .flex-auto > .d-md-flex > .col-md-9',
);
if (col) {
  col.querySelector('.mx-auto')?.setAttribute('style', '');
  col.classList.replace('col-md-9', 'col-md-12');
  col.classList.replace('col-lg-8', 'col-lg-12');
}
document.querySelector('aside[aria-label="Explore"]')?.remove();
