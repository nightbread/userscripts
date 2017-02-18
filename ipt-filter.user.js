// ==UserScript==
// @name iPT filter
// @namespace http://github.com/nightbread
// @version 0.0.27
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
    const allowedPrefixes = new RegExp('^(' + [
        'AllGirlMassage',
        'Colette',
        'DayWithAPornstar',
        'DeliaTs',
        'GirlfriendFilms',
        'GirlGrind',
        'GirlsWay',
        'HotAndMean',
        'IKissGirls',
        'MilfNextDoor',
        'MommysGirl',
        'MomsLickTeens',
        'PartyOfThree',
        'SexTapeLesbians',
        'SheFuckedHer',
        'SweetheartVideo',
        'Twistys',
        'WebYoung',
        'WeLiveTogether',
        'WhenGirlsPlay',
    ].join('|') + ')\.[0-9]{2}', 'i');
    const lesbo = /\blesb(?:ian|o)\b/i;
    const SELECTOR = '#torrents > tbody > tr > td > a.b';
    const xxxRegexp = /[^X]XXX.(?:[0-9]|HR)/;

    Array.from(document.querySelectorAll(SELECTOR)).forEach(function(el, i) {
        const rowPromise = new Promise(function (res, rej) {
            res(el.parentElement.parentElement);
        });

        if (xvidIPTTeam.test(el.innerText)) {
            rowPromise.then(function (row) { row.remove(); });
            return;
        }

        if (!xxxRegexp.test(el.innerText) ||
            allowedPrefixes.test(el.innerText) ||
            lesbo.test(el.innerText)) {
            return;
        }

        rowPromise.then(function (row) {
            row.remove();
        });
    });
})();
