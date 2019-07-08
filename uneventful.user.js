// ==UserScript==
// @name         Uneventful
// @namespace    https://microsoft.com/
// @version      1.3.4
// @description  Prevent annoying events from being bound.
// @author       Audreyshake of Reddit
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @updateURL https://raw.githubusercontent.com/nightbread/userscripts/master/uneventful.user.js
// @downloadURL https://raw.githubusercontent.com/nightbread/userscripts/master/uneventful.user.js
// ==/UserScript==

// Inspired by <http://stackoverflow.com/a/10326899>.

// const pasteEvents = [
//   'select',
//   'selectstart',
//   'selectionchange',
//   'beforecopy',
//   'beforecut',
//   'beforepaste',
//   'copy',
//   'cut',
//   'paste',
//   'contextmenu'
// ];
// const activityEvents = [
//   'visibilitychange'
// ];
// const mundaneEvents = [
//   'click',
//   'mousedown',
//   'load',
//   'unload',
//   'DOMContentLoaded',
//   'getData',
//   'setData'
// ];

const movementEvents = [
  'keydown',
  'keypress',
  'keyup',
  'wheel',
  'mousewheel', // Deprecated but apparently still accepted by Chrome
  'scroll'
];

/*
 * Search domain, superdomains, default.
 * Order: deny, allow.
 * Default: allow.
 *
 * Use '.my.domain' to match 'my.domain', 'mail.my.domain', etc., and
 * 'my.domain' to match only 'my.domain'.
 */
const domainPermissions = {
  '.dailystormer.name': {
    deny: movementEvents
  },
  '.unicornriot.ninja': {
    deny: movementEvents
  },
  DEFAULT: {
    allow: '*'
  }
};

// Sites that do not like overriding addEventListener to be read-only
const aelBlacklist = ['.icloud.com'];

/**
 * @param {string} domain
 * @param {string} event
 * @return {boolean}
 */
function doesCanEvent(domain, event) {
  let last = domain;
  let next = last.replace(/..*?\./, '.');
  let superdomains = [domain, '.' + domain];

  for (; next != last; last = next) {
    superdomains.push(next);
    next = last.replace(/..*?\./, '.');
  }

  superdomains.push('DEFAULT');

  /**
   * @param {Object<string, any>} obj
   * @param {string} key
   * @return {boolean}
   */
  const hop = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  for (domain of superdomains) {
    if (hop(domainPermissions, domain)) {
      const dp = domainPermissions[domain];
      if (hop(dp, 'deny') &&
        (dp.deny.indexOf(event) != -1 || dp.deny.indexOf('*') != -1)) {
        return false;
      }
      if (hop(dp, 'allow') &&
        (dp.allow.indexOf(event) != -1 || dp.allow.indexOf('*') != -1)) {
        return true;
      }
    }
  }

  return false;
}

[HTMLElement.prototype, document, window].forEach((element) => {
  const trueBlueAddEventListener = element.addEventListener;

  element.addEventListener = function (...args) {
    if (doesCanEvent(window.location.host, args[0])) {
      try {
        trueBlueAddEventListener.apply(this, args);
        // eslint-disable-next-line no-empty
      } catch (exc) {
        window.console.error(exc);
      }
    }
  };

  /*
   * Keep scripts from redefining addEventListener. Since we've already
   * captured the real addEventListener, it isn't really necessary, but I'm
   * not a fan of sites doing it.
   *
   * See <http://stackoverflow.com/a/7757493>.
   */
  const domain = window.location.host.replace(/..*?\./, '.');
  if (!aelBlacklist.includes(domain)) {
    Object.defineProperty(element, 'addEventListener', {
      value: element.addEventListener, writable: false
    });
  }
});
