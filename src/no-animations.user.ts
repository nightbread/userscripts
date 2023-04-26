'use strict';
// ==UserScript==
// @name         No animations
// @version      0.0.5
// @description  Disable animations.
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @noframes
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/no-animations.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/no-animations.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
const noAnimationsStyle = document.createElement('style');
noAnimationsStyle.dataset.fromTampermonkey = 'true';
noAnimationsStyle.dataset.script = 'No animations';
noAnimationsStyle.appendChild(document.createTextNode(''));
document.head.appendChild(noAnimationsStyle);
if (noAnimationsStyle.sheet) {
  noAnimationsStyle.sheet.insertRule(
    `*, :before, :after {
          /*CSS transitions*/
          transition-property: none !important;
          /*CSS animations*/
          animation: none !important;
        }`,
    0,
  );
}
