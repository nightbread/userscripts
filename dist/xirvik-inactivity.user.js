'use strict';
// ==UserScript==
// @name         Xirvik rutorrent inactivity
// @namespace    http://tampermonkey.net/
// @version      0.1
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
class Idle {
  constructor(options) {
    this.awayTimeout = 3000;
    this.awayTimestamp = 0;
    this.isAway = false;
    if (options) {
      this.awayTimeout = options.awayTimeout;
      this.onAway = options.onAway;
      this.onAwayBack = options.onAwayBack;
      this.onHidden = options.onHidden;
      this.onVisible = options.onVisible;
    }
    const activeMethod = this.onActive.bind(this);
    window.onclick = activeMethod;
    window.onkeydown = activeMethod;
    window.onmouseenter = activeMethod;
    window.onmousemove = activeMethod;
    window.onscroll = activeMethod;
    this.startAwayTimeout();
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) {
          if (this.onHidden) {
            this.onHidden();
          }
        } else {
          if (this.onVisible) {
            this.onVisible();
          }
        }
      },
      false,
    );
  }
  onActive() {
    this.awayTimestamp = new Date().getTime() + this.awayTimeout;
    if (this.isAway) {
      if (this.onAwayBack) {
        this.onAwayBack();
      }
      this.startAwayTimeout();
    }
    this.isAway = false;
    return true;
  }
  startAwayTimeout() {
    this.awayTimestamp = new Date().getTime() + this.awayTimeout;
    if (typeof this.awayTimer !== 'undefined') {
      clearTimeout(this.awayTimer);
    }
    return (this.awayTimer = setTimeout(
      this.checkAway.bind(this),
      this.awayTimeout + 100,
    ));
  }
  checkAway() {
    const t = new Date().getTime();
    if (t < this.awayTimestamp) {
      this.isAway = false;
      this.awayTimer = setTimeout(
        this.checkAway.bind(this),
        this.awayTimestamp - t + 100,
      );
      return;
    }
    if (typeof this.awayTimer !== 'undefined') {
      clearTimeout(this.awayTimer);
    }
    this.isAway = true;
    if (this.onAway) {
      this.onAway();
    }
  }
}
new Idle({
  awayTimeout: 3e5,
  onAway: () =>
    (location.href = `https://${location.hostname}/downloads/#inactivityrt=true`),
});
