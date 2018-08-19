// ==UserScript==
// @name         Fix scroll
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  Ignore all custom window "wheel" events.
// @author       You
// @match        https?://dailystormer.name/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  window.addEventListener('wheel', function (event) {
    event.stopPropagation();
  }, true);
})();

