// ==UserScript==
// @name         Monospace for code
// @namespace    http://theguardi.an/
// @version      0.0.1
// @description  Use plain monospace for code on GitHub
// @author       TheGuardian
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @match        https://gitlab.com/*
// @match        https://bitbucket.org/*
// @grant        none
// ==/UserScript==

const codeFontStyle = document.createElement('style');
if (codeFontStyle.sheet) {
  codeFontStyle.appendChild(document.createTextNode('')); // WebKit hack :(
  document.head.appendChild(codeFontStyle);
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
