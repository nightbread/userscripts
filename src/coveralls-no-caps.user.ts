// ==UserScript==
// @description  No ALL CAPS on Coveralls.
// @grant        none
// @match        https://coveralls.io/*
// @name         Coveralls no-all-caps
// @namespace    http://tat.sh/
// @version      0.1.3
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/coveralls-no-caps.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/coveralls-no-caps.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
// From https://davidwalsh.name/add-rules-stylesheets

((element, doc, head) =>
  head.appendChild((element.appendChild(doc.createTextNode('')), element)) &&
  element.sheet &&
  element.sheet.insertRule('* { text-transform: none !important; }', 0))(
  document.createElement('style'),
  document,
  document.head,
);
const uppercaseFirst = (x: string) => `${x[0]}${x.toLowerCase().substring(1)}`;
const $$ = document.querySelectorAll.bind(document);
for (const el of Array.from($$<HTMLAnchorElement>('a[href="/careers"]'))) {
  el.innerHTML = el.innerHTML.replace('CAREERS', 'Careers');
}
for (const el of Array.from($$<HTMLAnchorElement>('footer a')).filter(
  el => el.innerText.toUpperCase() === el.innerText,
)) {
  el.innerText = uppercaseFirst(el.innerText);
}
