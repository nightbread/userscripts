// ==UserScript==
// @name         Disable codeview textarea
// @author       Duologic
// @author       nightbread
// @description  Disable textareas in the new GitHub code view.
// @downloadURL  https://github.com/nightbread/userscripts/raw/master/dist/github-disable-codeview-textareas.user.js
// @homepage     https://github.com/nightbread/userscripts
// @match        https://*.github.com/*
// @run-at       document-end
// @updateURL    https://github.com/nightbread/userscripts/raw/master/dist/github-disable-codeview-textareas.user.js
// @version      0.1.0
// ==/UserScript==
((selector: string): Promise<HTMLTextAreaElement> =>
  new Promise(resolve => {
    const el = document.querySelector<HTMLTextAreaElement>(selector);
    if (el) {
      return resolve(el);
    }
    const observer = new MutationObserver(() => {
      const el = document.querySelector<HTMLTextAreaElement>(selector);
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
  .then(elm => {
    elm.remove();
    Array.from(document.querySelectorAll<HTMLDivElement>('.react-code-text')).forEach(x => {
      x.style.pointerEvents = 'auto';
    });
    Array.from(document.querySelectorAll<HTMLSpanElement>('[data-code-text]')).forEach(x => {
      x.innerText = x.dataset.codeText ?? '';
      delete x.dataset.codeText;
    });
  })
  .catch(console.error);
