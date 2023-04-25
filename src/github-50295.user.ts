// ==UserScript==
// @name         GitHub 50295
// @version      0.0.1
// @description  Fix selection when EWPF flag is enabled. See https://github.com/orgs/community/discussions/50295
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @match        https://gitlab.com/*
// @match        https://bitbucket.org/*
// @grant        none
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/github-50295.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/github-50295.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(''));
if (styleElement.sheet) {
  document.head.appendChild(styleElement);
  styleElement.sheet.insertRule(
    '::selection { background-color: rgba(56,139,253,0.4) !important; }',
  );
}
