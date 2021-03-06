'use strict';
// ==UserScript==
// @name         Monospace for code
// @version      0.0.5
// @description  Use plain monospace for code on GitHub and other sites.
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @match        https://gitlab.com/*
// @match        https://bitbucket.org/*
// @grant        none
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/code-font.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/code-font.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
((element, doc, head) =>
  head.appendChild((element.appendChild(doc.createTextNode('')), element)) &&
  element.sheet &&
  [
    // GitHub
    '.blob-code-inner, .blob-num',
    // GitLab
    '.file-content.code pre code',
    // BitBucket
    '.view-lines',
    '.line-numbers > a',
  ].forEach(selector => {
    var _a;
    return (_a = element.sheet) === null || _a === void 0
      ? void 0
      : _a.insertRule(`${selector} { font-family: monospace !important; }`, 0);
  }))(document.createElement('style'), document, document.head);
