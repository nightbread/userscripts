// ==UserScript==
// @name         Monospace for code
// @version      0.0.4
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

const codeFontStyle = document.createElement('style');
codeFontStyle.appendChild(document.createTextNode('')); // WebKit hack :(
document.head.appendChild(codeFontStyle);
if (codeFontStyle.sheet) {
  for (const selector of [
    // GitHub
    '.blob-code-inner, .blob-num',
    // GitLab
    '.file-content.code pre code',
    // BitBucket
    '.view-lines',
    '.line-numbers > a',
  ]) {
    codeFontStyle.sheet.insertRule(
      `${selector} { font-family: monospace !important; }`,
      0,
    );
  }
}
