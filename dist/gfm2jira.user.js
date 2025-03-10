'use strict';
// ==UserScript==
// @description  Convert Markdown to JIRA syntax in any Wiki textarea
// @grant        none
// @match        *://*/*
// @name         Convert GFM to JIRA
// @version      0.3.3
// @author       nightbread
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/gfm2jira.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/gfm2jira.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
const KEYCODE_ESCAPE = 27;
const KEYCODE_NON_CONVERSION = 29;
const MAP = {
  cite: '??',
  del: '-',
  ins: '+',
  sub: '~',
  sup: '^',
};
/**
 * Takes JIRA markup and converts it to Markdown.
 *
 * @param input JIRA markup text
 * @returns Markdown formatted text
 */
const toM = input =>
  input
    .replace(
      /^h([0-6])\.(.*)$/gm,
      (_, level, content) =>
        `${Array(parseInt(typeof level === 'string' ? level : '0', 10) + 1).join('#')}${content}`,
    )
    .replace(
      /([*_])(.*)\1/g,
      (_, wrapper, content) =>
        `${wrapper === '*' ? '**' : '*'}${content}${wrapper === '*' ? '**' : '*'}`,
    )
    .replace(/\{\{([^}]+)\}\}/g, '`$1`')
    .replace(/\?\?([^?]+)\?\?/g, '<cite>$1</cite>')
    .replace(/\+([^+]*)\+/g, '<ins>$1</ins>')
    .replace(/\^([^^]*)\^/g, '<sup>$1</sup>')
    .replace(/~([^~]*)~/g, '<sub>$1</sub>')
    .replace(/-([^-]*)-/g, '-$1-')
    .replace(/\{code(:([a-z]+))?\}([^]*)\{code\}/gm, '```$2$3```')
    .replace(/\[(.+?)\|(.+)\]/g, '[$1]($2)')
    .replace(/\[(.+?)\]([^(]*)/g, '<$1>$2')
    .replace(/{noformat}/g, '```');
/**
 * Takes Markdown and converts it to JIRA formatted text
 *
 * @param input
 */
const toJ = input =>
  input
    .replace(
      /^(.*?)\n([=-])+$/gm,
      (_, content, level) => `h${level[0] === '=' ? 1 : 2}. ${content}`,
    )
    .replace(/^([#]+)(.*?)$/gm, (_, level, content) => `h${level.length}.${content}`)
    .replace(
      /([*_]+)(.*?)\1/g,
      (_, wrapper, content) =>
        `${wrapper.length === 1 ? '_' : '*'}${content}${wrapper.length === 1 ? '_' : '*'}`,
    )
    // Make multi-level bulleted lists work
    .replace(
      /^(\s*)- (.*)$/gm,
      (_, level, content) =>
        `${Array(level.length > 0 ? parseInt(String(level.length / 4)) + 2 : 2).join('-')} ${content}`,
    )
    .replace(
      new RegExp('<(' + Object.keys(MAP).join('|') + ')>(.*?)</\\1>', 'g'),
      (_, from, content) => `${MAP[from]}${content}${MAP[from]}`,
    )
    .replace(/~~(.*?)~~/g, '-$1-')
    .replace(
      /`{3,}(\w+)?([^`]+)`{3,}/g,
      (_, syntax, content) => `{code${syntax ? ':' + syntax : ''}}${content}{code}`,
    )
    .replace(/`([^`]+)`/g, '{{$1}}')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$1|$2]')
    .replace(/<([^>]+)>/g, '[$1]');
window.addEventListener(
  'keypress',
  /**
   * Convert to JIRA with _Ctrl+Shift+[_.
   * Convert to Markdown with _Ctrl+Shift+]_.
   */
  event => {
    const el = event.target;
    const textarea = el;
    if (
      !el ||
      !el?.classList.contains('wiki-textfield') ||
      el?.nodeName.toUpperCase() !== 'TEXTAREA' ||
      textarea.readOnly ||
      !(
        event.ctrlKey &&
        event.shiftKey &&
        (event.keyCode === KEYCODE_ESCAPE || event.keyCode === KEYCODE_NON_CONVERSION)
      )
    ) {
      return;
    }
    const orig = textarea.value;
    textarea.value = event.keyCode === KEYCODE_ESCAPE ? toJ(textarea.value) : toM(textarea.value);
    if (textarea.value === orig) {
      return;
    }
    window.AJS?.messages?.info?.('#ghx-errors', {
      body: `<p>Converted to ${event.keyCode === KEYCODE_ESCAPE ? 'JIRA markup' : 'Markdown'}</p>`,
      fadeout: true,
      title: 'Conversion',
    });
  },
);
