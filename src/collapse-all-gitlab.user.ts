// ==UserScript==
// @name         Collapse all GitLab diffs
// @namespace    https://github.com/johanbrandhorst/collapse-gitlab-files
// @version      0.3.4
// @description  Collapses all files on a GitLab merge request diff page
// @author       Johan Brandhorst
// @grant        none
// @include      https://gitlab.com/*/merge_requests/*
// @include      https://gitlab.com/*/commit/*
// ==/UserScript==

// Script based on script suggested by Pantelis Geo
// (https://gitlab.com/pantelis.geo.90)
// in https://gitlab.com/gitlab-org/gitlab-ce/issues/24679
// and StackOverflow answer
// http://stackoverflow.com/questions/6480082/add-a-javascript-button-using-greasemonkey-or-tampermonkey

const button = document.createElement('a');
button.setAttribute('id', 'collapse-button');
button.setAttribute('class', 'btn btn-default');
button.textContent = 'Collapse All';
const buttons = document.querySelector('.inline-parallel-buttons');
if (buttons?.firstChild) {
  buttons.insertBefore(button, buttons.firstChild);
}
const handler = () =>
  Array.from(
    document.querySelectorAll<HTMLDivElement>('.diff-file .diff-content'),
  )
    .filter(x => x.style.display === 'none')
    .forEach(x => {
      let el = x.parentElement?.querySelector<HTMLDivElement>(
        '.file-title-flex-parent',
      );
      if (!el) {
        el = x.parentElement?.parentElement?.querySelector<HTMLDivElement>(
          '.file-title-flex-parent',
        );
      }
      el?.click();
    });
button.addEventListener('click', handler, false);
document.addEventListener(
  'keydown',
  e => {
    if (!e.defaultPrevented && e.code === 'KeyK' && e.ctrlKey) {
      handler();
      e.preventDefault();
    }
  },
  true,
);
