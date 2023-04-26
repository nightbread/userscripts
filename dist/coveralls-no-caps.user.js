'use strict';
// ==UserScript==
// @description  No ALL CAPS on Coveralls.
// @grant        none
// @match        https://coveralls.io/*
// @name         Coveralls no-all-caps
// @namespace    http://z.sh/
// @version      0.1.5
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/coveralls-no-caps.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/coveralls-no-caps.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
// From https://davidwalsh.name/add-rules-stylesheets
const noCapsStyle = document.createElement('style');
noCapsStyle.dataset.fromTampermonkey = 'true';
noCapsStyle.dataset.script = 'Coveralls no-all-caps';
noCapsStyle.appendChild(document.createTextNode(''));
document.head.appendChild(noCapsStyle);
if (noCapsStyle.sheet) {
  noCapsStyle.sheet.insertRule('* { text-transform: none !important; }', 0);
}
const uppercaseFirst = x => `${x[0]}${x.toLowerCase().substring(1)}`;
const $$ = document.querySelectorAll.bind(document);
for (const el of Array.from($$('a[href="/careers"]'))) {
  el.innerHTML = el.innerHTML.replace('CAREERS', 'Careers');
}
for (const el of Array.from($$('footer a')).filter(
  el => el.innerText.toUpperCase() === el.innerText,
)) {
  el.innerText = uppercaseFirst(el.innerText);
}
