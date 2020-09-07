'use strict';
// ==UserScript==
// @name         Uneventful
// @version      1.3.8
// @description  Prevent annoying events from being bound.
// @grant        none
// @run-at       document-start
// @author       nightbread
// @author       Audreyshake of Reddit
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/uneventful.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/uneventful.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// @match        *://*/*
// @exclude *://*.adp.com/*
// @exclude *://*.arin.net/*
// @exclude *://*.creditsesame.com/*
// @exclude *://*.duke-energy.com/*
// @exclude *://*.fedex.com/*
// @exclude *://*.gamespot.com/*
// @exclude *://*.geico.com/*
// @exclude *://*.ignitioncasino.com/*
// @exclude *://*.inbox.lv/*
// @exclude *://*.marcos.com/*
// @exclude *://*.ring.com/*
// @exclude *://*.seminolewildcard.com/*
// @exclude *://*.slack.com/*
// @exclude *://*.sony.com/*
// @exclude *://*.speedpay.com/*
// @exclude *://*.universalorlando.com/*
// @exclude *://*.youtube.com/*
// @exclude *://gab.com/*
// @exclude *://github.com/*
// @exclude *://gitlab.com/*
// ==/UserScript==
// Inspired by <http://stackoverflow.com/a/10326899>.
/** Movement events. */
const movementEvents = [
  'keydown',
  'keypress',
  'keyup',
  'wheel',
  'mousewheel',
  'scroll',
];
/**
 * Search domain, super-domains, default.
 * Order: deny, allow.
 * Default: allow.
 *
 * Use '.my.domain' to match 'my.domain', 'mail.my.domain', etc., and
 * 'my.domain' to match only 'my.domain'.
 */
const domainPermissions = {
  '.dailystormer.su': {
    deny: movementEvents,
  },
  '.unicornriot.ninja': {
    deny: movementEvents,
  },
  DEFAULT: {
    allow: '*',
  },
};
/** Sites that do not like overriding addEventListener to be read-only. */
const aelBlacklist = ['.icloud.com'];
/** Generate superdomains of a domain. */
const superDomains = function* (domain) {
  yield domain;
  yield '.' + domain;
  for (
    let last = domain, next = domain.replace(/..*?\./, '.');
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
const doesCanEvent = (domain, event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  for (const domain_ of superDomains(domain)) {
    if (
      ((_b =
        (_a = domainPermissions[domain_]) === null || _a === void 0
          ? void 0
          : _a.deny) === null || _b === void 0
        ? void 0
        : _b.includes(event)) ||
      ((_d =
        (_c = domainPermissions[domain_]) === null || _c === void 0
          ? void 0
          : _c.deny) === null || _d === void 0
        ? void 0
        : _d.includes('*'))
    ) {
      return false;
    } else if (
      ((_f =
        (_e = domainPermissions[domain_]) === null || _e === void 0
          ? void 0
          : _e.allow) === null || _f === void 0
        ? void 0
        : _f.includes(event)) ||
      ((_h =
        (_g = domainPermissions[domain_]) === null || _g === void 0
          ? void 0
          : _g.allow) === null || _h === void 0
        ? void 0
        : _h.includes('*'))
    ) {
      return true;
    }
  }
  return false;
};
// Entry point
[HTMLElement.prototype, document, window].forEach(element => {
  const ael = element.addEventListener;
  element.addEventListener = function (...args) {
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
