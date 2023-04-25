// ==UserScript==
// @name         No Nonsense
// @namespace    http://wwww.theguardian.com/
// @version      0.0.2
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
for (const selector of ['#banner-blm', '#blm-banner']) {
  document.querySelectorAll(selector).forEach(x => x.remove());
}
