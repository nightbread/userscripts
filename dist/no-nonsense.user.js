'use strict';
var _a, _b;
// ==UserScript==
// @name         No Nonsense
// @namespace    http://wwww.theguardian.com/
// @version      0.0.1
// @description  Remove nonsense.
// @noframes
// @author       nightbread
// @match        https://expressjs.com/*
// @match        https://api.jquery.com/*
// @grant        none
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/no-nonsense.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/no-nonsense.user.js
// ==/UserScript==
(_a = document.querySelector('#blm-banner')) === null || _a === void 0
  ? void 0
  : _a.remove();
(_b = document.querySelector('#banner-blm')) === null || _b === void 0
  ? void 0
  : _b.remove();
((element, doc, head) =>
  head.appendChild((element.appendChild(doc.createTextNode('')), element)) &&
  (el => {
    var _a, _b, _c;
    (_a = el.sheet) === null || _a === void 0
      ? void 0
      : _a.insertRule('#logo a { margin-top: 0 !important }', 0);
    (_b = el.sheet) === null || _b === void 0
      ? void 0
      : _b.insertRule(`.content > header,
      #home-content > header {
        height: 60px !important;
      }`);
    (_c = el.sheet) === null || _c === void 0
      ? void 0
      : _c.insertRule('#menu { top: 64px !important }');
  })(element))(document.createElement('style'), document, document.head);
