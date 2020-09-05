// ==UserScript==
// @name         Uneventful
// @namespace    https://microsoft.com/
// @version      1.3.6
// @description  Prevent annoying events from being bound.
// @author       Audreyshake of Reddit
// @match        *://*/*
// @exclude *://*.ignitioncasino.com/*
// @exclude *://*.marcos.com/*
// @exclude *://account.arin.net/*
// @exclude *://account.ring.com/*
// @exclude *://app.slack.com/*
// @exclude *://gab.com/*
// @exclude *://github.com/*
// @exclude *://gitlab.com/*
// @exclude *://internet.speedpay.com/*
// @exclude *://login.inbox.lv/*
// @exclude *://*.google.com/*
// @exclude *://music.youtube.com/*
// @exclude *://my.account.sony.com/*
// @exclude *://my.adp.com/*
// @exclude *://portfolio.geico.com/*
// @exclude *://secure.creditsesame.com/*
// @exclude *://wiki.yabause.org/*
// @exclude *://www.duke-energy.com/*
// @exclude *://www.fedex.com/*
// @exclude *://www.gamespot.com/*
// @exclude *://www.seminolewildcard.com/*
// @exclude *://www.universalorlando.com/*
// @exclude *://www.youtube.com/*
// @exclude *://www.bitchute.com/*
// @grant        none
// @run-at       document-start
// @updateURL https://raw.githubusercontent.com/nightbread/userscripts/master/uneventful.user.js
// @downloadURL https://raw.githubusercontent.com/nightbread/userscripts/master/uneventful.user.js
// ==/UserScript==
// Inspired by <http://stackoverflow.com/a/10326899>.
/** Movement events. */
const movementEvents = [
  'keydown',
  'keypress',
  'keyup',
  'wheel',
  'mousewheel', // Deprecated but apparently still accepted by Chrome
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
const domainPermissions: {
  [domain: string]: {
    allow?: '*' | string[];
    deny?: '*' | string[];
  };
} = {
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
    if (
      domainPermissions[domain_]?.deny?.includes(event) ||
      domainPermissions[domain_]?.deny?.includes('*')
    ) {
      return false;
    } else if (
      domainPermissions[domain_]?.allow?.includes(event) ||
      domainPermissions[domain_]?.allow?.includes('*')
    ) {
      return true;
    }
  }
  return false;
};
// Entry point
[HTMLElement.prototype, document, window].forEach(element => {
  const ael = element.addEventListener;
  element.addEventListener = (
    ...args: [
      string,
      EventListenerOrEventListenerObject,
      (boolean | AddEventListenerOptions)?,
    ]
  ) => {
    if (!doesCanEvent(window.location.host, args[0])) {
      console.log(
        `uneventful: Not binding "${args[0]}" event ` +
          `(host: ${window.location.host})`,
      );
      return;
    }
    try {
      ael.apply(element, args);
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
