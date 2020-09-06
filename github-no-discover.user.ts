// ==UserScript==
// @name         No Discover
// @homepage     https://gist.github.com/TheGuardian/d1b5a039d6f511c95a08daade8b07a81
// @namespace    https://theguardi.an
// @version      0.0.5
// @description  Hide the Discover section in >= 1012px view.
// @author       Meh
// @match        https://github.com
// @grant        none
// @run-at       document-end
// @updateURL    https://gist.github.com/TheGuardian/d1b5a039d6f511c95a08daade8b07a81/raw/github-no-discover.user.js
// @downloadURL  https://gist.github.com/TheGuardian/d1b5a039d6f511c95a08daade8b07a81/raw/github-no-discover.user.js
// @supportURL   https://theguardi.an
// @noframes
// ==/UserScript==
const githubNoDiscoverStyle = document.createElement('style');
if (githubNoDiscoverStyle.sheet) {
  githubNoDiscoverStyle.setAttribute('media', '(min-width: 1012px)');
  githubNoDiscoverStyle.appendChild(document.createTextNode('')); // WebKit hack :(
  document.head.appendChild(githubNoDiscoverStyle);
  githubNoDiscoverStyle.sheet.insertRule(
    'aside[aria-label="Explore"] { display: none; }',
    0,
  );
  githubNoDiscoverStyle.sheet.insertRule(
    'body > div.application-main > div > div { width: 75%; }',
    1,
  );
}
