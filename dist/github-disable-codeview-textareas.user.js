'use strict';
// ==UserScript==
// @author       Duologic
// @description  Disable textareas in the new GitHub code view.
// @match        https://*.github.com/*
// @name         Disable codeview textarea
// @run-at       document-end
// @version      0.0.1
// ==/UserScript==
(selector =>
  new Promise(resolve => {
    const el = document.querySelector(selector);
    if (el) {
      return resolve(el);
    }
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        resolve(el);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }))('#read-only-cursor-text-area')
  .then(elm => (elm.disabled = true))
  .catch(console.error);
