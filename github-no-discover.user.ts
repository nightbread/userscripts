// ==UserScript==
// @name         No Discover
// @version      0.0.7
// @description  Hide the Discover section in >= 1012px view.
// @match        https://github.com
// @grant        none
// @run-at       document-end
// @noframes
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/github-no-discover.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/github-no-discover.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
const githubNoDiscoverStyle = document.createElement('style');
githubNoDiscoverStyle.setAttribute('media', '(min-width: 1012px)');
githubNoDiscoverStyle.appendChild(document.createTextNode('')); // WebKit hack :(
document.head.appendChild(githubNoDiscoverStyle);
if (githubNoDiscoverStyle.sheet) {
  githubNoDiscoverStyle.sheet.insertRule(
    'aside[aria-label="Explore"] { display: none; }',
    0,
  );
  githubNoDiscoverStyle.sheet.insertRule(
    'body > div.application-main > div > div { width: 75%; }',
    1,
  );
}
