// ==UserScript==
// @name bemaniso BlueBit Fixer
// @namespace https://github.com/nightbread/userscripts
// @version 0.2
// @description Do not use.
// @author nightbread
// @include https://bemaniso.ws/*
// @include http://bemaniso.ws/*
// @updateURL https://raw.githubusercontent.com/nightbread/userscripts/master/bemaniso-height-fix.user.js
// @downloadURL https://raw.githubusercontent.com/nightbread/userscripts/master/bemaniso-height-fix.user.js
// ==/UserScript==

(function () {
    const content = document.querySelector('#content');
    content.style.marginTop = '41px';
    content.style.border = '0';
})();
