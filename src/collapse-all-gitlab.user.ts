// ==UserScript==
// @name         Collapse all GitLab diffs
// @namespace    https://github.com/johanbrandhorst/collapse-gitlab-files
// @version      0.3.6
// @description  Collapses all files on a GitLab merge request diff page
// @author       Johan Brandhorst
// @grant        none
// @match        https://gitlab.com/*/merge_requests/*
// @match        https://gitlab.com/*/commit/*
// @match        https://git.ringcentral.com/*/commit/*
// @match        https://git.ringcentral.com/*/merge_requests/*
// ==/UserScript==

// Script based on script suggested by Pantelis Geo
// (https://gitlab.com/pantelis.geo.90)
// in https://gitlab.com/gitlab-org/gitlab-ce/issues/24679
// and StackOverflow answer
// http://stackoverflow.com/questions/6480082/add-a-javascript-button-using-greasemonkey-or-tampermonkey

const button = document.createElement('a');
button.setAttribute('id', 'collapse-button');
button.setAttribute('class', 'btn btn-default');
button.style.cursor = 'pointer';
button.textContent = 'Collapse All';
const buttons = document.querySelector('.inline-parallel-buttons');
if (buttons?.firstChild) {
  buttons.insertBefore(button, buttons.firstChild);
}
const sharedHandler = () =>
  Array.from(
    document.querySelectorAll<HTMLDivElement>('.diff-file .diff-content'),
  )
    .filter(x => x.style.display !== 'none')
    .forEach(x =>
      (
        x.parentElement?.querySelector<HTMLDivElement>(
          '.file-title-flex-parent',
        ) ||
        x.parentElement?.parentElement?.querySelector<HTMLDivElement>(
          '.file-title-flex-parent',
        )
      )?.click(),
    );
button.addEventListener('click', sharedHandler, false);
document.addEventListener(
  'keydown',
  e => {
    if (!e.defaultPrevented && e.code === 'KeyK' && e.ctrlKey && e.shiftKey) {
      sharedHandler();
      e.preventDefault();
    }
  },
  true,
);
