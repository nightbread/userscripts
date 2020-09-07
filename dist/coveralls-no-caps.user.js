'use strict';
// ==UserScript==
// @description  No ALL CAPS on Coveralls.
// @grant        none
// @match        https://coveralls.io/*
// @name         Coveralls no-all-caps
// @namespace    http://tat.sh/
// @version      0.1.2
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/coveralls-no-caps.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/coveralls-no-caps.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
// From https://davidwalsh.name/add-rules-stylesheets
const coverallsNoCapsStyle = document.createElement('style');
coverallsNoCapsStyle.appendChild(document.createTextNode('')); // WebKit hack :(
document.head.appendChild(coverallsNoCapsStyle);
if (coverallsNoCapsStyle.sheet) {
  coverallsNoCapsStyle.sheet.insertRule(
    '* { text-transform: none !important; }',
    0,
  );
}
for (const el of Array.from(document.querySelectorAll('a[href="/careers"]'))) {
  el.innerHTML = el.innerHTML.replace('CAREERS', 'Careers');
}
for (const el of Array.from(document.querySelectorAll('footer a')).filter(
  el => el.innerText.toUpperCase() == el.innerText,
)) {
  el.innerText = `${el.innerText[0]}${el.innerText
    .toLowerCase()
    .substring(1)}`;
}
