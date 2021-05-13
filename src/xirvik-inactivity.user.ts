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

interface IdleOptions {
  awayTimeout: number;
  onAway?: () => void;
  onAwayBack?: () => void;
  onHidden?: () => void;
  onVisible?: () => void;
}

class Idle {
  private awayTimeout = 3000;
  private awayTimer?: number;
  private awayTimestamp = 0;
  private isAway = false;
  private onAway?: () => void;
  private onAwayBack?: () => void;
  private onHidden?: () => void;
  private onVisible?: () => void;

  constructor(options?: IdleOptions) {
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

  private onActive(): boolean {
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

  private startAwayTimeout(): number {
    this.awayTimestamp = new Date().getTime() + this.awayTimeout;
    if (typeof this.awayTimer !== 'undefined') {
      clearTimeout(this.awayTimer);
    }
    return (this.awayTimer = setTimeout(
      this.checkAway.bind(this),
      this.awayTimeout + 100,
    ));
  }

  private checkAway(): void {
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
