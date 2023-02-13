'use strict';
// ==UserScript==
// @name         Xirvik ruTorrent inactivity
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       You
// @match        https://*.xirvik.com/rtorrent/
// @grant        none
// @updateURL    https://raw.githubusercontent.com/nightbread/userscripts/master/dist/xirvik-inactivity.user.js
// @downloadURL  https://raw.githubusercontent.com/nightbread/userscripts/master/dist/xirvik-inactivity.user.js
// @homepage     https://github.com/nightbread/userscripts
// @supportURL   https://www.theguardian.com/
// @namespace    https://www.theguardian.com/
// ==/UserScript==
const IDLE_TIME = 3e5;
const idle = (awayTimeout = 3000, options) => {
  let awayTimer = void 0;
  let awayTimestamp = void 0;
  let isAway = false;
  const checkAway = () => {
    var _a;
    const t = new Date().getTime();
    awayTimestamp || (awayTimestamp = new Date().getTime() + awayTimeout);
    if (t < awayTimestamp) {
      isAway = false;
      awayTimer = setTimeout(checkAway, awayTimestamp - t + 100);
      return;
    }
    if (typeof awayTimer !== 'undefined') {
      clearTimeout(awayTimer);
    }
    isAway = true;
    (_a = options === null || options === void 0 ? void 0 : options.onAway) ===
      null || _a === void 0
      ? void 0
      : _a.call(options);
  };
  const startAwayTimeout = () => {
    awayTimestamp = new Date().getTime() + awayTimeout;
    if (typeof awayTimer !== 'undefined') {
      clearTimeout(awayTimer);
    }
    return (awayTimer = setTimeout(checkAway, awayTimeout + 100));
  };
  window.onclick =
    window.onkeydown =
    window.onmouseenter =
    window.onmousemove =
    window.onscroll =
      () => {
        var _a;
        awayTimestamp = new Date().getTime() + awayTimeout;
        if (isAway) {
          (_a =
            options === null || options === void 0
              ? void 0
              : options.onAwayBack) === null || _a === void 0
            ? void 0
            : _a.call(options);
          startAwayTimeout();
        }
        isAway = false;
        return true;
      };
  startAwayTimeout();
  document.addEventListener(
    'visibilitychange',
    () => {
      var _a, _b;
      return document.hidden
        ? (_a =
            options === null || options === void 0
              ? void 0
              : options.onHidden) === null || _a === void 0
          ? void 0
          : _a.call(options)
        : (_b =
            options === null || options === void 0
              ? void 0
              : options.onVisible) === null || _b === void 0
        ? void 0
        : _b.call(options);
    },
    false,
  );
};
idle(IDLE_TIME, {
  onAway: () =>
    (location.href = `https://${location.hostname}/downloads/#inactivityrt=true`),
});
