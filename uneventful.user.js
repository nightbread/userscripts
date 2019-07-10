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

/** Movement events. */
const movementEvents = [
  "keydown",
  "keypress",
  "keyup",
  "wheel",
  "mousewheel", // Deprecated but apparently still accepted by Chrome
  "scroll"
];

/**
 * Search domain, super-domains, default.
 * Order: deny, allow.
 * Default: allow.
 *
 * Use '.my.domain' to match 'my.domain', 'mail.my.domain', etc., and
 * 'my.domain' to match only 'my.domain'.
 *
 * @type {Object<string, {allow?: string[]|string, deny?: string[] | string}>}
 */
const domainPermissions = {
  ".dailystormer.name": {
    deny: movementEvents
  },
  ".unicornriot.ninja": {
    deny: movementEvents
  },
  DEFAULT: {
    allow: "*"
  }
};

/**
 * Sites that do not like overriding addEventListener to be read-only.
 */
const aelBlacklist = [".icloud.com"];

/**
 * @param {Object<string, any>} obj Object.
 * @param {string} key Key to lookup.
 * @returns {boolean} Returns `true` key is present in the object.
 */
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Checks if an event should be triggered for a domain.
 * @param {string} domain Domain string.
 * @param {string} event Event name.
 * @returns {boolean} Returns `true` if the event is allowed.
 */
const doesCanEvent = (domain, event) => {
  let last = domain;
  let next = last.replace(/..*?\./, ".");
  let superDomains = [domain, "." + domain];
  for (; next != last; last = next) {
    superDomains.push(next);
    next = last.replace(/..*?\./, ".");
  }
  superDomains.push("DEFAULT");

  for (domain of superDomains) {
    if (hasOwn(domainPermissions, domain)) {
      const dp = domainPermissions[domain];
      if (
        hasOwn(dp, "deny") &&
        (dp.deny.indexOf(event) != -1 || dp.deny.indexOf("*") != -1)
      ) {
        return false;
      }
      if (
        hasOwn(dp, "allow") &&
        (dp.allow.indexOf(event) != -1 || dp.allow.indexOf("*") != -1)
      ) {
        return true;
      }
    }
  }

  return false;
};

// Entry point
[HTMLElement.prototype, document, window].forEach(element => {
  const trueBlueAddEventListener = element.addEventListener;
  element.addEventListener = function(...args) {
    if (doesCanEvent(window.location.host, args[0])) {
      try {
        trueBlueAddEventListener.apply(this, args);
      } catch (exc) {
        window.console.error(exc);
      }
    }
  };
  // Keep scripts from redefining addEventListener. Since we've already
  // captured the real addEventListener, it isn't really necessary, but I'm
  // not a fan of sites doing it.
  // See <http://stackoverflow.com/a/7757493>.
  const domain = window.location.host.replace(/..*?\./, ".");
  if (!aelBlacklist.includes(domain)) {
    Object.defineProperty(element, "addEventListener", {
      value: element.addEventListener,
      writable: false
    });
  }
});
