// ==UserScript==
// @name         Fix scroll
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  Ignore all custom window "wheel" events.
// @author       Yu
// @include      http://*
// @include      https://*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  window.addEventListener('wheel', function (event) {
    event.stopPropagation();
  }, true);
})();

