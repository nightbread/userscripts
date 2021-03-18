'use strict';
// ==UserScript==
// @name         Collapse all GitLab diffs
// @namespace    https://github.com/johanbrandhorst/collapse-gitlab-files
// @version      0.3.0
// @description  Collapses all files on a GitLab merge request diff page
// @author       Johan Brandhorst
// @grant        none
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include      https://gitlab.com/*/merge_requests/*
// @include      https://gitlab.com/*/commit/*
// ==/UserScript==
var _a, _b;
// Script based on script suggested by Pantelis Geo
// (https://gitlab.com/pantelis.geo.90)
// in https://gitlab.com/gitlab-org/gitlab-ce/issues/24679
// and StackOverflow answer
// http://stackoverflow.com/questions/6480082/add-a-javascript-button-using-greasemonkey-or-tampermonkey
(_b = (_a = window).waitForKeyElements) === null || _b === void 0
  ? void 0
  : _b.call(_a, '.inline-parallel-buttons', () => {
      var _a;
      const button = document.createElement('a');
      button.setAttribute('id', 'collapse-button');
      button.setAttribute('class', 'btn btn-default');
      button.textContent = 'Collapse All';
      const buttons = document.querySelector('.inline-parallel-buttons');
      if (
        buttons === null || buttons === void 0 ? void 0 : buttons.firstChild
      ) {
        buttons.insertBefore(button, buttons.firstChild);
      }
      (_a = document.querySelector('.collapse-button')) === null ||
      _a === void 0
        ? void 0
        : _a.addEventListener(
            'click',
            _ =>
              Array.from(document.querySelectorAll('.diff-file .diff-content'))
                .filter(x => x.style.display === 'none')
                .forEach(x => {
                  var _a;
                  return ((_a = x.parentElement) === null || _a === void 0
                    ? void 0
                    : _a.querySelector('.file-title-flex-parent')
                  ).click();
                }),
            false,
          );
    });
