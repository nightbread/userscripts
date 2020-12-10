// ==UserScript==
// @name         Uneventful
// @version      1.4.1
// @description  Prevent annoying events from being bound.
// @grant        none
// @run-at       document-start
// @author       nightbread
// @author       Audreyshake of Reddit
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/uneventful.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/uneventful.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// @match *://*.dailystormer.su/*
// @match *://*.unicornriot.ninja/*
// ==/UserScript==
// Inspired by <http://stackoverflow.com/a/10326899>.
/** Movement events. */
const movementEvents = new Set([
  'keydown',
  'keypress',
  'keyup',
  'wheel',
  'mousewheel', // Deprecated but apparently still accepted by Chrome
  'scroll',
]);
/**
 * Search domain, super-domains, default.
 * Order: deny, allow.
 * Default: allow.
 *
 * Use '.my.domain' to match 'my.domain', 'mail.my.domain', etc., and
 * 'my.domain' to match only 'my.domain'.
 */
const domainPermissions: {
  [domain: string]: {
    allow?: '*' | Set<string>;
    deny?: '*' | Set<string>;
  };
} = {
  '.dailystormer.su': {
    deny: movementEvents,
  },
  '.unicornriot.ninja': {
    deny: movementEvents,
  },
  DEFAULT: {
    deny: '*',
  },
};
/** Sites that do not like overriding addEventListener to be read-only. */
const aelBlacklist = ['.icloud.com'];
/** Generate super-domains of a domain. */
const superDomains = function* (
  domain: keyof typeof domainPermissions,
): Generator<keyof typeof domainPermissions | string | 'DEFAULT'> {
  yield domain as string;
  yield '.' + (domain as string);
  for (
    let last = domain as string,
      next = (domain as string).replace(/..*?\./, '.');
    next != last;
    next = last.replace(/..*?\./, '.'), last = next
  ) {
    yield next;
  }
  yield 'DEFAULT';
};
/**
 * Checks if an event should be triggered for a domain.
 * @param domain Domain string.
 * @param event Event name.
 * @returns Returns `true` if the event is allowed.
 */
const doesCanEvent = (
  domain: keyof typeof domainPermissions,
  event: string,
) => {
  for (const domain_ of superDomains(domain)) {
    if (domainPermissions[domain_]) {
      const deny = domainPermissions[domain_].deny;
      const allow = domainPermissions[domain_].allow;
      if (deny && (deny === '*' || deny.has(event))) {
        return false;
      } else if (allow && (allow === '*' || allow.has(event))) {
        return true;
      }
    }
  }
  return false;
};
// Entry point
[HTMLElement.prototype, document, window].forEach(element => {
  const ael = element.addEventListener;
  element.addEventListener = function (
    ...args: [
      string,
      EventListenerOrEventListenerObject,
      (boolean | AddEventListenerOptions)?,
    ]
  ) {
    if (!doesCanEvent(window.location.host, args[0])) {
      console.log(
        `uneventful: Not binding "${args[0]}" event ` +
          `(host: ${window.location.host})`,
      );
      return;
    }
    try {
      ael.apply(this, args);
    } catch (e) {
      return console.debug(
        `uneventful: Did not bind original "${args[0]}" event`,
        e,
        element,
        args[1],
        args[2],
      );
    }
    console.debug(
      `uneventful: Successfully bound original "${args[0]}" event`,
    );
  };
  // Keep scripts from redefining addEventListener. Since we've already
  // captured the real addEventListener, it isn't really necessary, but I'm
  // not a fan of sites doing it.
  // See <http://stackoverflow.com/a/7757493>.
  if (!aelBlacklist.includes(window.location.host.replace(/..*?\./, '.'))) {
    Object.defineProperty(element, 'addEventListener', {
      value: element.addEventListener,
      writable: false,
    });
  }
});
