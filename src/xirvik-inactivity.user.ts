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

interface IdleOptions {
  onAway?: () => void;
  onAwayBack?: () => void;
  onHidden?: () => void;
  onVisible?: () => void;
}

const IDLE_TIME = 3e5;
const idle = (awayTimeout = 3000, options?: IdleOptions) => {
  let awayTimer = void 0 as number | undefined;
  let awayTimestamp = void 0 as number | undefined;
  let isAway = false;
  const checkAway = () => {
    const t = new Date().getTime();
    awayTimestamp ||= new Date().getTime() + awayTimeout;
    if (t < awayTimestamp) {
      isAway = false;
      awayTimer = setTimeout(checkAway, awayTimestamp - t + 100);
      return;
    }
    if (typeof awayTimer !== 'undefined') {
      clearTimeout(awayTimer);
    }
    isAway = true;
    options?.onAway?.();
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
        awayTimestamp = new Date().getTime() + awayTimeout;
        if (isAway) {
          options?.onAwayBack?.();
          startAwayTimeout();
        }
        isAway = false;
        return true;
      };
  startAwayTimeout();
  document.addEventListener(
    'visibilitychange',
    () => (document.hidden ? options?.onHidden?.() : options?.onVisible?.()),
    false,
  );
};

idle(IDLE_TIME, {
  onAway: () => (location.href = `https://${location.hostname}/downloads/#inactivityrt=true`),
});
