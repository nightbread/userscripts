// ==UserScript==
// @name         Uneventful
// @namespace    https://microsoft.com/
// @version      1.3
// @description  Prevent annoying events from being bound.
// @author       Audreyshake of Reddit
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/* Inspired by <http://stackoverflow.com/a/10326899>. */

const pasteEvents = [
    'select',
    'selectstart',
    'selectionchange',
    'beforecopy',
    'beforecut',
    'beforepaste',
    'copy',
    'cut',
    'paste',
    'contextmenu'
];

const activityEvents = [
    'visibilitychange'
];

const movementEvents = [
    'keydown',
    'keypress',
    'keyup',
    'wheel',
    'mousewheel', // Deprecated but apparently still accepted by Chrome
    'scroll'
];

const mundaneEvents = [
    'click',
    'mousedown',
    'load',
    'unload',
    'DOMContentLoaded',
    'getData',
    'setData'
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
    DEFAULT: {
        allow: '*'
    }
};

// Sites that do not like overriding addEventListener to be read-only
const aelBlacklist = ['.icloud.com'];

/**
 * @param string domain
 * @param string event
 * @returns bool
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

    for (domain of superdomains) {
        if (domainPermissions.hasOwnProperty(domain)) {
            var dp = domainPermissions[domain];
            if (dp.hasOwnProperty('deny') &&
                (dp.deny.indexOf(event) != -1 || dp.deny.indexOf('*') != -1)) {
                return false;
            }
            if (dp.hasOwnProperty('allow') &&
                (dp.allow.indexOf(event) != -1 ||
                 dp.allow.indexOf('*') != -1)) {
                return true;
            }
        }
    }

    return false;
}

[HTMLElement.prototype, document, window].forEach(function(element) {
    const trueBlueAddEventListener = element.addEventListener;

    element.addEventListener = function(type, listener) {
        if (doesCanEvent(window.location.host, type)) {
            trueBlueAddEventListener.apply(
                this, Array.prototype.slice.apply(arguments));
            // console.groupCollapsed('%cAccepted event: %s', 'color:#aaa', type);
        } else {
            console.groupCollapsed(
                '%cEvent refused: %c%s', 'color:red', 'color:default', type);
        }
        // console.log('Element: %O', this);
        // console.log('Listener: %o', listener);
        // console.log('Listener source: %s', listener.toString()); // For dealing with really bizarre things?
        // console.trace();
        console.groupEnd();
    };

    /*
     * Keep scripts from redefining addEventListener. Since we've already captured the real addEventListener, it isn't
     * really necessary, but I'm not a fan of sites doing it.
     *
     * See <http://stackoverflow.com/a/7757493>.
     */
    const domain = window.location.host.replace(/..*?\./, '.');
    if (!aelBlacklist.includes(domain)) {
        Object.defineProperty(element, 'addEventListener', {
            value: element.addEventListener, writable: false });
    }
});
