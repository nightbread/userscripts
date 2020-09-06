// ==UserScript==
// @author       You
// @description  try to take over the world!
// @grant        none
// @match        https://coveralls.io/*
// @name         Coveralls no-all-caps
// @namespace    http://tat.sh/
// @version      0.1
// ==/UserScript==
// From https://davidwalsh.name/add-rules-stylesheets
const coverallsNoCapsStyle = document.createElement('style');
if (coverallsNoCapsStyle.sheet) {
  coverallsNoCapsStyle.appendChild(document.createTextNode('')); // WebKit hack :(
  document.head.appendChild(coverallsNoCapsStyle);
  coverallsNoCapsStyle.sheet.insertRule(
    '* { text-transform: none !important; }',
    0,
  );
}
for (const el of Array.from(
  document.querySelectorAll<HTMLAnchorElement>('a[href="/careers"]'),
)) {
  el.innerHTML = el.innerHTML.replace('CAREERS', 'Careers');
}
for (const el of Array.from(
  document.querySelectorAll<HTMLAnchorElement>('footer a'),
).filter(el => el.innerText.toUpperCase() == el.innerText)) {
  el.innerText = `${el.innerText[0]}${el.innerText
    .toLowerCase()
    .substring(1)}`;
}
