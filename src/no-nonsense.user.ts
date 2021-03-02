// ==UserScript==
// @name         No Nonsense
// @namespace    http://wwww.theguardian.com/
// @version      0.0.1
// @description  Remove nonsense.
// @noframes
// @author       nightbread
// @match        https://expressjs.com/*
// @grant        none
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/no-nonsense.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/no-nonsense.user.js
// ==/UserScript==
document.querySelector('#blm-banner')?.remove();
((element, doc, head) =>
  head.appendChild((element.appendChild(doc.createTextNode('')), element)) &&
  (el => {
    el.sheet?.insertRule('#logo a { margin-top: 0 !important }', 0);
    el.sheet?.insertRule(
      `.content > header,
      #home-content > header {
        height: 60px !important;
      }`,
    );
    el.sheet?.insertRule('#menu { top: 64px !important }');
  })(element))(document.createElement('style'), document, document.head);
