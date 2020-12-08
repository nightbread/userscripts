'use strict';
// ==UserScript==
// @name         No animations
// @version      0.0.3
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
((element, doc, head) =>
  head.appendChild((element.appendChild(doc.createTextNode('')), element)) &&
  element.sheet &&
  element.sheet.insertRule(
    `*, :before, :after {
          /*CSS transitions*/
          transition-property: none !important;
          /*CSS animations*/
          animation: none !important;
        }`,
    0,
  ))(document.createElement('style'), document, document.head);
