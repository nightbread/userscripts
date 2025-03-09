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

// From https://github.com/FokkeZB/J2M/blob/master/src/J2M.js
type WindowAJS = Window &
  typeof globalThis & {
    AJS?: { messages?: { info: (s: string, x: any) => void } };
  };
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
const toM = (input: string) =>
  input
    .replace(
      /^h([0-6])\.(.*)$/gm,
      (_, level, content) =>
        `${Array(parseInt(typeof level === 'string' ? level : '0', 10) + 1).join('#')}${
          content as string
        }`,
    )
    .replace(
      /([*_])(.*)\1/g,
      (_, wrapper, content) =>
        `${wrapper === '*' ? '**' : '*'}${content as string}${wrapper === '*' ? '**' : '*'}`,
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
const toJ = (input: string) =>
  input
    .replace(
      /^(.*?)\n([=-])+$/gm,
      (_, content, level) => `h${(level as string[])[0] === '=' ? 1 : 2}. ${content as string}`,
    )
    .replace(
      /^([#]+)(.*?)$/gm,
      (_, level, content) => `h${(level as any[]).length}.${content as string}`,
    )
    .replace(
      /([*_]+)(.*?)\1/g,
      (_, wrapper: any[], content: string) =>
        `${wrapper.length === 1 ? '_' : '*'}${content}${wrapper.length === 1 ? '_' : '*'}`,
    )
    // Make multi-level bulleted lists work
    .replace(
      /^(\s*)- (.*)$/gm,
      (_, level: any[], content: string) =>
        `${Array(level.length > 0 ? parseInt(String(level.length / 4)) + 2 : 2).join(
          '-',
        )} ${content}`,
    )
    .replace(
      new RegExp('<(' + Object.keys(MAP).join('|') + ')>(.*?)</\\1>', 'g'),
      (_, from: keyof typeof MAP, content: string) => `${MAP[from]}${content}${MAP[from]}`,
    )
    .replace(/~~(.*?)~~/g, '-$1-')
    .replace(
      /`{3,}(\w+)?([^`]+)`{3,}/g,
      (_, syntax: string, content: string) => `{code${syntax ? ':' + syntax : ''}}${content}{code}`,
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
    const el = event.target as HTMLTextAreaElement | null | HTMLElement;
    const textarea = el as HTMLTextAreaElement;
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
    (window as WindowAJS).AJS?.messages?.info?.('#ghx-errors', {
      body: `<p>Converted to ${event.keyCode === KEYCODE_ESCAPE ? 'JIRA markup' : 'Markdown'}</p>`,
      fadeout: true,
      title: 'Conversion',
    });
  },
);
