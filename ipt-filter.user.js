// ==UserScript==
// @name iPT filter
// @namespace http://github.com/nightbread
// @version 0.0.31
// @encoding utf-8
// @license https://opensource.org/licenses/MIT
// @homepage https://github.com/nightbread/userscripts
// @description Do not use.
// @author nightbread
// @include https://iptorrents.eu/t*
// @updateURL https://raw.githubusercontent.com/nightbread/userscripts/master/ipt-filter.user.js
// @downloadURL https://raw.githubusercontent.com/nightbread/userscripts/master/ipt-filter.user.js
// @supportURL https://github.com/nightbread/userscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    const xvidIPTTeam = /XviD-iPT Team/;
    const SELECTOR = '#torrents > tbody > tr > td > a';

    Array.from(document.querySelectorAll(SELECTOR)).forEach((el) => {
        if (xvidIPTTeam.test(el.innerText)) {
            el.parentElement.parentElement.remove();
            return;
        }
    });
})();
